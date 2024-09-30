<?php
/**
 * Copyright (C) MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Nikolay Beketov, 11 2019
 *
 */
namespace Modules\ModuleDocker\App\Forms;
use Phalcon\Forms\Element\Hidden;
use Phalcon\Forms\Form;


class ModuleDockerForm extends Form
{

    public function initialize($entity = null, $options = null): void
    {
        // id
        $this->add(new Hidden('id', ['value' => $entity->id]));

    }
}