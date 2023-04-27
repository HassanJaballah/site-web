(function($){"use strict";var $error=$('<div class="wld-error-overlay"></div>');function showError($field,message){var field=$field[0];var pos=$field.offset();$error.css({top:(pos.top+$field.height())+'px',left:pos.left+'px'})
$error.text(message||field.validationMessage);$(document.body).append($error);}
function hideError(){$error.remove();}
function getCaptionForInput($input){return getFieldForElement($input).children('.wld-field__caption');}
function getFieldForElement($el){return $el.closest('.wld-field');}
function getFieldGroupForElement($el){return $el.closest('.wld-fieldgroup');}
function validateGroup($group){var isValid=true;var inputs=getInputsForGroup($group);hideError();inputs.each(function(i,input){if(isValid&&!input.validity.valid){input.focus();showError($(input));isValid=false;}})
return isValid;}
function getActiveInput(){return $(document.activeElement);}
function getInputsForGroup($group){return $group.find('input,select');}
function MultiStepForm(el){var currentStep=0;function moveToNextField(){var $input=getActiveInput();var $group=getFieldGroupForElement($input);var $inputs=getInputsForGroup($group);var index=$inputs.index($input);if(index===$inputs.length-1){return moveToNextGroup();}else{$inputs[index+1].focus();return true;}}
function moveToPreviousField(){var $input=getActiveInput();var $group=getFieldGroupForElement($input);var $inputs=getInputsForGroup($group);var index=$inputs.index($input);if(index===0){return moveToPreviousGroup();}else{$inputs[index-1].focus();return true;}}
function moveToNextGroup(){var $currentGroup=$groups.eq(currentStep);var $nextGroup=$groups.eq(currentStep+1);if(validateGroup($currentGroup)){if($nextGroup.length){currentStep++;showGroup();getInputsForGroup($nextGroup)[0].focus();highlightSteps();return true;}else{submitForm();}
return false;}
return false;}
function submitForm(){el.submit();}
function highlightSteps(){$steps.removeClass("chatbox-current");$steps.eq(currentStep).addClass("chatbox-current");}
function moveToPreviousGroup(){var inputs;var $previousGroup=$groups.eq(currentStep-1)
if(currentStep>0){currentStep--;showGroup();inputs=getInputsForGroup($previousGroup);inputs[inputs.length-1].focus();highlightSteps();return true;}
return false;}
function showGroup(){$groups.removeClass('wld-fieldgroup--active').eq(currentStep).addClass('wld-fieldgroup--active');if(currentStep===$groups.length-1){$submit.text('Sign up');}else{$submit.text('Next');}}
var $el=$(el);this.$el=$el;var $steps=$(".form_steps");var $fields=$el.find('.wld-form__fields');var $submit=$el.find('.wld-form__actions button');var version=$el.find('input[name=version]').attr('value');var $consentField=$('<div class="wld-field"></div>');$fields.append($consentField);$el.find('.wld-field').wrap('<div class="wld-fieldgroup"></div>');getFieldForElement($('[name=consentCheck]')).appendTo($consentField);getFieldForElement($('[name=commsOptin]')).appendTo($consentField);$el.find('.wld-fieldgroup:empty').remove();var $groups=$el.find('.wld-fieldgroup');$groups.each(function(i){var $inputs=getInputsForGroup($groups.eq(i));$inputs.each(function(j){var $input=$inputs.eq(j);var caption=getCaptionForInput($input).text();if($input.is('.wld-input--select')){var firstOption=$input[0].options[0];if(firstOption.text.toLowerCase()==='please select'){firstOption.text=caption;}}else{if($input.is('[name="password"]')){caption+=' (min 8 characters)';}
$input.attr('placeholder',caption);}});});$('.wld-button').click($.proxy(function(e){e.preventDefault();moveToNextGroup();},this));$steps.on("click",function(){if($(this).index()>currentStep){moveToNextGroup();}else if($(this).index()<currentStep){moveToPreviousGroup();}});$fields.keydown($.proxy(function(e){if(e.keyCode===9||e.keyCode===13){e.preventDefault();if(e.shiftKey){moveToPreviousField();}else{moveToNextField();}}},this));$fields.on('focusin click',function(e){hideError();});$(window).resize(function(e){hideError();});showGroup();}
$.fn.multiStepForm=function(method){this.each(function(i,el){var form=new MultiStepForm(el);form.$el.data("MultiStepForm",form);});return this;};}(jQuery));WLD.ready(function(){var $day=$('#signup-dobday');var $month=$('#signup-dobmonth');var $year=$('#signup-dobyear');var $submit=$('.wld-button');$('.wld-input--select').each(function(){var $input=$(this);switch($input.prop('name')){case 'dobday':$input.children().eq(0).text('DD');break;case 'dobmonth':$input.children().eq(0).text('MM');break;case 'dobyear':$input.children().eq(0).text('YYYY');break;}});$('.signup-wrap form').multiStepForm();});