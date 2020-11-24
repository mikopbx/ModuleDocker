<?php
/**
 * Copyright © MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Alexey Portnov, 11 2019
 */

namespace Modules\ModuleDocker\Lib;

use MikoPBX\Core\System\Configs\CronConf;
use MikoPBX\Core\System\Processes;
use MikoPBX\Modules\Config\ConfigClass;
use MikoPBX\Core\System\Util;
use MikoPBX\Modules\PbxExtensionUtils;
use MikoPBX\PBXCoreREST\Lib\PBXApiResult;

class DockerConf extends ConfigClass
{

    /**
     *  Process CoreAPI requests under root rights
     *
     * @param array $request
     *
     * @return PBXApiResult
     */
    public function moduleRestAPICallback(array $request): PBXApiResult
    {
        $res = new PBXApiResult();
        $res->processor = __METHOD__;
        $action = strtoupper($request['action']);
        $res->success = false;
        $res->messages[]="API {$action} not found in moduleRestAPICallback ModuleDocker";

        return $res;
    }


    /**
     * Process after enable action in web interface
     *
     * @return void
     */
    public function onAfterModuleEnable(): void
    {
        $binDir = $this->getBinDir();
        // Монтируем файловые системы.
        Processes::mwExec($binDir . '/cgroupfs-mount');
        // Запускаем docker.
        Processes::mwExecBg($binDir . '/safe_dockerd');

        $cron = new CronConf();
        $cron->reStart();
    }


    /**
     * Process after disable action in web interface
     *
     * @return void
     */
    public function onAfterModuleDisable(): void
    {
        $binDir      = $this->getBinDir();
        $killallPath = Util::which('killall');
        $dockerPath  = $binDir.DIRECTORY_SEPARATOR.'docker';

        Processes::mwExec("{$killallPath} safe_dockerd");
        Processes::mwExec("{$dockerPath} stop $({$dockerPath} ps -q)");
        // docker stop $(docker ps -q); docker rm $(docker ps -a -q) // удаление всех контейнеров.
        Processes::mwExec("{$killallPath} dockerd");
    }

    /**
     * @return string
     */
    private function getBinDir():string{
        return $this->moduleDir . DIRECTORY_SEPARATOR . 'bin';
    }

    /**
     *
     */
    public function checkStart():void{
        $moduleEnabled  = PbxExtensionUtils::isEnabled($this->moduleUniqueId);
        if($moduleEnabled === true){
            $this->onAfterModuleEnable();
        }else{
            $this->onAfterModuleDisable();
        }
    }

    /**
     * Добавление задач в crond.
     *
     * @param $tasks
     */
    public function createCronTasks(&$tasks): void
    {
        if ( ! is_array($tasks)) {
            return;
        }
        $workerPath = $this->moduleDir.DIRECTORY_SEPARATOR.'bin'.DIRECTORY_SEPARATOR.'safeScript.php';
        $phpPath = Util::which('php');
        $tasks[]      = "*/1 * * * * {$phpPath} -f {$workerPath} > /dev/null 2> /dev/null\n";
    }

}