<?php
/**
 * Copyright © MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Alexey Portnov, 2 2019
 */

/*
 * https://docs.phalconphp.com/3.4/ru-ru/db-models-metadata
 *
 */

namespace Modules\ModuleDocker\Models;


use MikoPBX\Modules\Models\ModulesModelsBase;

class ModuleDocker extends ModulesModelsBase
{

    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false)
     */
    public $id;

    /**
     * Key field
     *
     * @Column(type="string", nullable=false)
     */
    public $key;

    /**
     * Value field
     *
     * @Column(type="string", nullable=true)
     */
    public $value;

    public function initialize(): void
    {
        $this->setSource('m_ModuleDocker');
        parent::initialize();
    }

}