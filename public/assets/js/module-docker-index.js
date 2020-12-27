"use strict";

/*
 * Copyright (C) MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Nikolay Beketov, 11 2019 
 *
 */

/* global globalRootUrl,globalTranslate, Form, Config */
var ModuleDocker = {
  $formObj: $('#module-docker-form'),
  $checkBoxes: $('#module-docker-form .ui.checkbox'),
  $dropDowns: $('#module-docker-form .ui.dropdown'),
  $disabilityFields: $('#module-docker-form  .disability'),
  $statusToggle: $('#module-status-toggle'),
  $moduleStatus: $('#status'),
  validateRules: {
    textField: {
      identifier: 'text_field',
      rules: [{
        type: 'empty',
        prompt: globalTranslate.mod_dkrValidateValueIsEmpty
      }]
    },
    areaField: {
      identifier: 'text_area_field',
      rules: [{
        type: 'empty',
        prompt: globalTranslate.mod_dkrValidateValueIsEmpty
      }]
    },
    passwordField: {
      identifier: 'password_field',
      rules: [{
        type: 'empty',
        prompt: globalTranslate.mod_dkrValidateValueIsEmpty
      }]
    }
  },
  initialize: function () {
    function initialize() {
      // инициализируем чекбоксы и выподающие менюшки
      ModuleDocker.$checkBoxes.checkbox();
      ModuleDocker.$dropDowns.dropdown();
      ModuleDocker.checkStatusToggle();
      window.addEventListener('ModuleStatusChanged', ModuleDocker.checkStatusToggle);
      ModuleDocker.initializeForm();
    }

    return initialize;
  }(),

  /**
   * Изменение статуса кнопок при изменении статуса модуля
   */
  checkStatusToggle: function () {
    function checkStatusToggle() {
      if (ModuleDocker.$statusToggle.checkbox('is checked')) {
        ModuleDocker.$disabilityFields.removeClass('disabled');
        ModuleDocker.$moduleStatus.show();
      } else {
        ModuleDocker.$disabilityFields.addClass('disabled');
        ModuleDocker.$moduleStatus.hide();
      }
    }

    return checkStatusToggle;
  }(),

  /**
   * Применение настроек модуля после изменения данных формы
   */
  applyConfigurationChanges: function () {
    function applyConfigurationChanges() {
      $.api({
        url: "".concat(Config.pbxUrl, "/pbxcore/api/modules/ModuleDocker/reload"),
        on: 'now',
        successTest: function () {
          function successTest(response) {
            // test whether a JSON response is valid
            return Object.keys(response).length > 0 && response.result === true;
          }

          return successTest;
        }(),
        onSuccess: function () {
          function onSuccess() {
            ModuleDocker.$moduleStatus.removeClass('grey').addClass('green');
            ModuleDocker.$moduleStatus.html(globalTranslate.mod_dkr_Connected);
          }

          return onSuccess;
        }(),
        onFailure: function () {
          function onFailure() {
            ModuleDocker.$moduleStatus.removeClass('green').addClass('grey');
            ModuleDocker.$moduleStatus.html(globalTranslate.mod_dkr_Disconnected);
          }

          return onFailure;
        }()
      });
    }

    return applyConfigurationChanges;
  }(),
  cbBeforeSendForm: function () {
    function cbBeforeSendForm(settings) {
      var result = settings;
      result.data = ModuleDocker.$formObj.form('get values');
      return result;
    }

    return cbBeforeSendForm;
  }(),
  cbAfterSendForm: function () {
    function cbAfterSendForm() {
      ModuleDocker.applyConfigurationChanges();
    }

    return cbAfterSendForm;
  }(),
  initializeForm: function () {
    function initializeForm() {
      Form.$formObj = ModuleDocker.$formObj;
      Form.url = "".concat(globalRootUrl, "module-docker/save");
      Form.validateRules = ModuleDocker.validateRules;
      Form.cbBeforeSendForm = ModuleDocker.cbBeforeSendForm;
      Form.cbAfterSendForm = ModuleDocker.cbAfterSendForm;
      Form.initialize();
    }

    return initializeForm;
  }()
};
$(document).ready(function () {
  ModuleDocker.initialize();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUtZG9ja2VyLWluZGV4LmpzIl0sIm5hbWVzIjpbIk1vZHVsZURvY2tlciIsIiRmb3JtT2JqIiwiJCIsIiRjaGVja0JveGVzIiwiJGRyb3BEb3ducyIsIiRkaXNhYmlsaXR5RmllbGRzIiwiJHN0YXR1c1RvZ2dsZSIsIiRtb2R1bGVTdGF0dXMiLCJ2YWxpZGF0ZVJ1bGVzIiwidGV4dEZpZWxkIiwiaWRlbnRpZmllciIsInJ1bGVzIiwidHlwZSIsInByb21wdCIsImdsb2JhbFRyYW5zbGF0ZSIsIm1vZF9ka3JWYWxpZGF0ZVZhbHVlSXNFbXB0eSIsImFyZWFGaWVsZCIsInBhc3N3b3JkRmllbGQiLCJpbml0aWFsaXplIiwiY2hlY2tib3giLCJkcm9wZG93biIsImNoZWNrU3RhdHVzVG9nZ2xlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXRpYWxpemVGb3JtIiwicmVtb3ZlQ2xhc3MiLCJzaG93IiwiYWRkQ2xhc3MiLCJoaWRlIiwiYXBwbHlDb25maWd1cmF0aW9uQ2hhbmdlcyIsImFwaSIsInVybCIsIkNvbmZpZyIsInBieFVybCIsIm9uIiwic3VjY2Vzc1Rlc3QiLCJyZXNwb25zZSIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJyZXN1bHQiLCJvblN1Y2Nlc3MiLCJodG1sIiwibW9kX2Rrcl9Db25uZWN0ZWQiLCJvbkZhaWx1cmUiLCJtb2RfZGtyX0Rpc2Nvbm5lY3RlZCIsImNiQmVmb3JlU2VuZEZvcm0iLCJzZXR0aW5ncyIsImRhdGEiLCJmb3JtIiwiY2JBZnRlclNlbmRGb3JtIiwiRm9ybSIsImdsb2JhbFJvb3RVcmwiLCJkb2N1bWVudCIsInJlYWR5Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztBQVFBO0FBRUEsSUFBTUEsWUFBWSxHQUFHO0FBQ3BCQyxFQUFBQSxRQUFRLEVBQUVDLENBQUMsQ0FBQyxxQkFBRCxDQURTO0FBRXBCQyxFQUFBQSxXQUFXLEVBQUVELENBQUMsQ0FBQyxrQ0FBRCxDQUZNO0FBR3BC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QUFNO0FBQ3ZCdEQsRUFBQUEsWUFBWSxDQUFDa0IsVUFBYjtBQUNBLENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSBNSUtPIExMQyAtIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqIFVuYXV0aG9yaXplZCBjb3B5aW5nIG9mIHRoaXMgZmlsZSwgdmlhIGFueSBtZWRpdW0gaXMgc3RyaWN0bHkgcHJvaGliaXRlZFxuICogUHJvcHJpZXRhcnkgYW5kIGNvbmZpZGVudGlhbFxuICogV3JpdHRlbiBieSBOaWtvbGF5IEJla2V0b3YsIDExIDIwMTkgXG4gKlxuICovXG5cbi8qIGdsb2JhbCBnbG9iYWxSb290VXJsLGdsb2JhbFRyYW5zbGF0ZSwgRm9ybSwgQ29uZmlnICovXG5cbmNvbnN0IE1vZHVsZURvY2tlciA9IHtcblx0JGZvcm1PYmo6ICQoJyNtb2R1bGUtZG9ja2VyLWZvcm0nKSxcblx0JGNoZWNrQm94ZXM6ICQoJyNtb2R1bGUtZG9ja2VyLWZvcm0gLnVpLmNoZWNrYm94JyksXG5cdCRkcm9wRG93bnM6ICQoJyNtb2R1bGUtZG9ja2VyLWZvcm0gLnVpLmRyb3Bkb3duJyksXG5cdCRkaXNhYmlsaXR5RmllbGRzOiAkKCcjbW9kdWxlLWRvY2tlci1mb3JtICAuZGlzYWJpbGl0eScpLFxuXHQkc3RhdHVzVG9nZ2xlOiAkKCcjbW9kdWxlLXN0YXR1cy10b2dnbGUnKSxcblx0JG1vZHVsZVN0YXR1czogJCgnI3N0YXR1cycpLFxuXHR2YWxpZGF0ZVJ1bGVzOiB7XG5cdFx0dGV4dEZpZWxkOiB7XG5cdFx0XHRpZGVudGlmaWVyOiAndGV4dF9maWVsZCcsXG5cdFx0XHRydWxlczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dHlwZTogJ2VtcHR5Jyxcblx0XHRcdFx0XHRwcm9tcHQ6IGdsb2JhbFRyYW5zbGF0ZS5tb2RfZGtyVmFsaWRhdGVWYWx1ZUlzRW1wdHksXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0sXG5cdFx0YXJlYUZpZWxkOiB7XG5cdFx0XHRpZGVudGlmaWVyOiAndGV4dF9hcmVhX2ZpZWxkJyxcblx0XHRcdHJ1bGVzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiAnZW1wdHknLFxuXHRcdFx0XHRcdHByb21wdDogZ2xvYmFsVHJhbnNsYXRlLm1vZF9ka3JWYWxpZGF0ZVZhbHVlSXNFbXB0eSxcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0fSxcblx0XHRwYXNzd29yZEZpZWxkOiB7XG5cdFx0XHRpZGVudGlmaWVyOiAncGFzc3dvcmRfZmllbGQnLFxuXHRcdFx0cnVsZXM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHR5cGU6ICdlbXB0eScsXG5cdFx0XHRcdFx0cHJvbXB0OiBnbG9iYWxUcmFuc2xhdGUubW9kX2RrclZhbGlkYXRlVmFsdWVJc0VtcHR5LFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHR9LFxuXHR9LFxuXHRpbml0aWFsaXplKCkge1xuXHRcdC8vINC40L3QuNGG0LjQsNC70LjQt9C40YDRg9C10Lwg0YfQtdC60LHQvtC60YHRiyDQuCDQstGL0L/QvtC00LDRjtGJ0LjQtSDQvNC10L3RjtGI0LrQuFxuXHRcdE1vZHVsZURvY2tlci4kY2hlY2tCb3hlcy5jaGVja2JveCgpO1xuXHRcdE1vZHVsZURvY2tlci4kZHJvcERvd25zLmRyb3Bkb3duKCk7XG5cdFx0TW9kdWxlRG9ja2VyLmNoZWNrU3RhdHVzVG9nZ2xlKCk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ01vZHVsZVN0YXR1c0NoYW5nZWQnLCBNb2R1bGVEb2NrZXIuY2hlY2tTdGF0dXNUb2dnbGUpO1xuXHRcdE1vZHVsZURvY2tlci5pbml0aWFsaXplRm9ybSgpO1xuXHR9LFxuXHQvKipcblx0ICog0JjQt9C80LXQvdC10L3QuNC1INGB0YLQsNGC0YPRgdCwINC60L3QvtC/0L7QuiDQv9GA0Lgg0LjQt9C80LXQvdC10L3QuNC4INGB0YLQsNGC0YPRgdCwINC80L7QtNGD0LvRj1xuXHQgKi9cblx0Y2hlY2tTdGF0dXNUb2dnbGUoKSB7XG5cdFx0aWYgKE1vZHVsZURvY2tlci4kc3RhdHVzVG9nZ2xlLmNoZWNrYm94KCdpcyBjaGVja2VkJykpIHtcblx0XHRcdE1vZHVsZURvY2tlci4kZGlzYWJpbGl0eUZpZWxkcy5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdE1vZHVsZURvY2tlci4kbW9kdWxlU3RhdHVzLnNob3coKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0TW9kdWxlRG9ja2VyLiRkaXNhYmlsaXR5RmllbGRzLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0TW9kdWxlRG9ja2VyLiRtb2R1bGVTdGF0dXMuaGlkZSgpO1xuXHRcdH1cblx0fSxcblx0LyoqXG5cdCAqINCf0YDQuNC80LXQvdC10L3QuNC1INC90LDRgdGC0YDQvtC10Log0LzQvtC00YPQu9GPINC/0L7RgdC70LUg0LjQt9C80LXQvdC10L3QuNGPINC00LDQvdC90YvRhSDRhNC+0YDQvNGLXG5cdCAqL1xuXHRhcHBseUNvbmZpZ3VyYXRpb25DaGFuZ2VzKCkge1xuXHRcdCQuYXBpKHtcblx0XHRcdHVybDogYCR7Q29uZmlnLnBieFVybH0vcGJ4Y29yZS9hcGkvbW9kdWxlcy9Nb2R1bGVEb2NrZXIvcmVsb2FkYCxcblx0XHRcdG9uOiAnbm93Jyxcblx0XHRcdHN1Y2Nlc3NUZXN0KHJlc3BvbnNlKSB7XG5cdFx0XHRcdC8vIHRlc3Qgd2hldGhlciBhIEpTT04gcmVzcG9uc2UgaXMgdmFsaWRcblx0XHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKHJlc3BvbnNlKS5sZW5ndGggPiAwICYmIHJlc3BvbnNlLnJlc3VsdCA9PT0gdHJ1ZTtcblx0XHRcdH0sXG5cdFx0XHRvblN1Y2Nlc3MoKSB7XG5cdFx0XHRcdE1vZHVsZURvY2tlci4kbW9kdWxlU3RhdHVzLnJlbW92ZUNsYXNzKCdncmV5JykuYWRkQ2xhc3MoJ2dyZWVuJyk7XG5cdFx0XHRcdE1vZHVsZURvY2tlci4kbW9kdWxlU3RhdHVzLmh0bWwoZ2xvYmFsVHJhbnNsYXRlLm1vZF9ka3JfQ29ubmVjdGVkKTtcblx0XHRcdH0sXG5cdFx0XHRvbkZhaWx1cmUoKSB7XG5cdFx0XHRcdE1vZHVsZURvY2tlci4kbW9kdWxlU3RhdHVzLnJlbW92ZUNsYXNzKCdncmVlbicpLmFkZENsYXNzKCdncmV5Jyk7XG5cdFx0XHRcdE1vZHVsZURvY2tlci4kbW9kdWxlU3RhdHVzLmh0bWwoZ2xvYmFsVHJhbnNsYXRlLm1vZF9ka3JfRGlzY29ubmVjdGVkKTtcblx0XHRcdH0sXG5cdFx0fSk7XG5cdH0sXG5cdGNiQmVmb3JlU2VuZEZvcm0oc2V0dGluZ3MpIHtcblx0XHRjb25zdCByZXN1bHQgPSBzZXR0aW5ncztcblx0XHRyZXN1bHQuZGF0YSA9IE1vZHVsZURvY2tlci4kZm9ybU9iai5mb3JtKCdnZXQgdmFsdWVzJyk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblx0Y2JBZnRlclNlbmRGb3JtKCkge1xuXHRcdE1vZHVsZURvY2tlci5hcHBseUNvbmZpZ3VyYXRpb25DaGFuZ2VzKCk7XG5cdH0sXG5cdGluaXRpYWxpemVGb3JtKCkge1xuXHRcdEZvcm0uJGZvcm1PYmogPSBNb2R1bGVEb2NrZXIuJGZvcm1PYmo7XG5cdFx0Rm9ybS51cmwgPSBgJHtnbG9iYWxSb290VXJsfW1vZHVsZS1kb2NrZXIvc2F2ZWA7XG5cdFx0Rm9ybS52YWxpZGF0ZVJ1bGVzID0gTW9kdWxlRG9ja2VyLnZhbGlkYXRlUnVsZXM7XG5cdFx0Rm9ybS5jYkJlZm9yZVNlbmRGb3JtID0gTW9kdWxlRG9ja2VyLmNiQmVmb3JlU2VuZEZvcm07XG5cdFx0Rm9ybS5jYkFmdGVyU2VuZEZvcm0gPSBNb2R1bGVEb2NrZXIuY2JBZnRlclNlbmRGb3JtO1xuXHRcdEZvcm0uaW5pdGlhbGl6ZSgpO1xuXHR9LFxufTtcblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuXHRNb2R1bGVEb2NrZXIuaW5pdGlhbGl6ZSgpO1xufSk7XG5cbiJdfQ==