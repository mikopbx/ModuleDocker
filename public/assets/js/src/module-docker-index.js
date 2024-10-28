/*
 * Copyright (C) MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Nikolay Beketov, 11 2019 
 *
 */

/* global globalRootUrl,globalTranslate, Form, Config */

const ModuleDocker = {
	$formObj: $('#module-docker-form'),
	$checkBoxes: $('#module-docker-form .ui.checkbox'),
	$dropDowns: $('#module-docker-form .ui.dropdown'),
	$disabilityFields: $('#module-docker-form  .disability'),
	$statusToggle: $('#module-status-toggle'),
	$moduleStatus: $('#status'),
	/**
	 * jQuery object for the log content.
	 * @type {jQuery}
	 */
	$logContent: $('#log-content-readonly'),
	/**
	 * The viewer for displaying the log content.
	 * @type {Ace}
	 */
	viewer: '',
	validateRules: {
		textField: {
			identifier: 'text_field',
			rules: [
				{
					type: 'empty',
					prompt: globalTranslate.mod_dkrValidateValueIsEmpty,
				},
			],
		},
		areaField: {
			identifier: 'text_area_field',
			rules: [
				{
					type: 'empty',
					prompt: globalTranslate.mod_dkrValidateValueIsEmpty,
				},
			],
		},
		passwordField: {
			identifier: 'password_field',
			rules: [
				{
					type: 'empty',
					prompt: globalTranslate.mod_dkrValidateValueIsEmpty,
				},
			],
		},
	},
	initialize() {
		// инициализируем чекбоксы и выподающие менюшки
		ModuleDocker.$checkBoxes.checkbox();
		ModuleDocker.$dropDowns.dropdown();
		ModuleDocker.checkStatusToggle();
		window.addEventListener('ModuleStatusChanged', ModuleDocker.checkStatusToggle);
		ModuleDocker.initializeForm();
		// ModuleDocker.initializeAce();
		// ModuleDocker.adjustLogHeight();
	},
	/**
	 * Function to adjust the height of the logs depending on the screen mode.
	 */
	adjustLogHeight() {
		setTimeout(() => {
			// let aceHeight = window.innerHeight - ModuleDocker.$logContent.offset().top - 25 - 222;
			let aceHeight = window.innerHeight - $('#output').offset().top - 100;
			// Recalculate the size of the ACE editor
			$('.log-content-readonly').css('min-height',  `${aceHeight}px`);
			ModuleDocker.viewer.resize();
		}, 300);
	},
	/**
	 * Initializes the ACE editor for log viewing.
	 */
	initializeAce() {
		ModuleDocker.viewer = ace.edit('log-content-readonly');

		// Check if the Julia mode is available
		const julia = ace.require('ace/mode/julia');
		if (julia !== undefined) {
			// Set the mode to Julia if available
			const IniMode = julia.Mode;
			ModuleDocker.viewer.session.setMode(new IniMode());
		}

		// Set the theme and options for the ACE editor
		ModuleDocker.viewer.setTheme('ace/theme/monokai');
		ModuleDocker.viewer.renderer.setShowGutter(false);
		ModuleDocker.viewer.setOptions({
			showLineNumbers: false,
			showPrintMargin: false,
			readOnly: true,
		});

	},
	/**
	 * Изменение статуса кнопок при изменении статуса модуля
	 */
	checkStatusToggle() {
		if (ModuleDocker.$statusToggle.checkbox('is checked')) {
			ModuleDocker.$disabilityFields.removeClass('disabled');
			ModuleDocker.$moduleStatus.show();
		} else {
			ModuleDocker.$disabilityFields.addClass('disabled');
			ModuleDocker.$moduleStatus.hide();
		}
	},
	/**
	 * Применение настроек модуля после изменения данных формы
	 */
	applyConfigurationChanges() {
		$.api({
			url: `${Config.pbxUrl}/pbxcore/api/modules/ModuleDocker/reload`,
			on: 'now',
			successTest(response) {
				// test whether a JSON response is valid
				return Object.keys(response).length > 0 && response.result === true;
			},
			onSuccess() {
				ModuleDocker.$moduleStatus.removeClass('grey').addClass('green');
				ModuleDocker.$moduleStatus.html(globalTranslate.mod_dkr_Connected);
			},
			onFailure() {
				ModuleDocker.$moduleStatus.removeClass('green').addClass('grey');
				ModuleDocker.$moduleStatus.html(globalTranslate.mod_dkr_Disconnected);
			},
		});
	},
	cbBeforeSendForm(settings) {
		const result = settings;
		result.data = ModuleDocker.$formObj.form('get values');
		return result;
	},
	cbAfterSendForm() {
		ModuleDocker.applyConfigurationChanges();
	},
	initializeForm() {
		Form.$formObj = ModuleDocker.$formObj;
		Form.url = `${globalRootUrl}module-docker/save`;
		Form.validateRules = ModuleDocker.validateRules;
		Form.cbBeforeSendForm = ModuleDocker.cbBeforeSendForm;
		Form.cbAfterSendForm = ModuleDocker.cbAfterSendForm;
		Form.initialize();
	},
};

$(document).ready(() => {
	ModuleDocker.initialize();
});

