<?php
namespace Modules\ModuleDocker\bin;
use Modules\ModuleDocker\Lib\DockerConf;
require_once 'Globals.php';
$voiceConf      = new DockerConf();
$voiceConf->checkStart();
