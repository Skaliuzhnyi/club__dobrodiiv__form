// маска input для вводу телефонного номеру та verification__code

$(function () {
  $('.input__phone').mask("+380(99) 999-99-99");
  $(".verification__code").mask("* * * * * *", {
    placeholder: "- - - - - -"
  })
});

// кастомізація календаря

$('[data-toggle="datepicker"]').datepicker({
  autoHide: true,
  language: 'uk-UA',
  days: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота'],
  daysShort: ['Нед', 'Пон', 'Вів', 'Сер', 'Четв', 'Птн', 'Суб'],
  daysMin: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб'],
  months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
  monthsShort: ['Січ', 'Лют', 'Бер', 'Кв', 'Тр', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гр'],
  weekStart: 1,
  startView: 2,
  yearFirst: true
});

// кастомізація випадаючого списку sellect

function makeСhoice() {
  const element = Array.from(document.querySelectorAll('.js-choice'));
  
  element.forEach(element => {
    let choices = new Choices(element, {
      searchEnable: false,
      itemSelectText: '',
    });
  });
}

makeСhoice();

// кастомізація input type number

$(function () {
  (function quantityProducts() {
    var $quantityArrowMinus = $(".quantity__arrow--minus");
    var $quantityArrowPlus = $(".quantity__arrow--plus");
    var $quantityNum = $(".quantity__number");

    $quantityArrowMinus.click(quantityMinus);
    $quantityArrowPlus.click(quantityPlus);

    function quantityMinus() {
      if ($quantityNum.val() > 1) {
        $quantityNum.val(+$quantityNum.val() - 1);
      }
    }

    function quantityPlus() {
      $quantityNum.val(+$quantityNum.val() + 1);
    }
  })();
});

// 

const checkboxHasDataMaster = document.querySelectorAll('[data-master]');

checkboxHasDataMaster.forEach(function (element) {
  element.addEventListener('click', togleDisableConectedInput);
});

function togleDisableConectedInput(event) {

  const checkboxTarget = event.currentTarget;
  const checkboxTargetData = checkboxTarget.dataset.master;
  const checkboxTargetDisplay = checkboxTarget.dataset.display;

  if (checkboxTargetData.length && checkboxTargetData.trim().length) {
    const connectedFormField = Array.from(document.querySelectorAll(`.${checkboxTargetData}`));

    connectedFormField.forEach(element => {
      const connectedInputTextarea = element.querySelector('.textarea__input');
      const connectedInputText = element.querySelector('.text');
      const allInputs = [connectedInputTextarea, connectedInputText];

      if (checkboxTarget.checked) {
        element.classList.remove('disabled');

        if (checkboxTargetDisplay === 'hide') {
          element.classList.remove('hide');
        }
      } else {
        element.classList.add('disabled');

        if (checkboxTargetDisplay === 'hide') {
          element.classList.add('hide');
        }
      }

      allInputs.forEach(function (element) {

        if (element !== null) {

          if (element.hasAttribute('disabled') && checkboxTarget.checked) {
            element.removeAttribute('disabled');
          } else {
            element.setAttribute('disabled', '');
          }

          if (element.hasAttribute('data-required') && checkboxTarget.checked) {
            element.setAttribute('required', '');
          } else {
            element.removeAttribute('required', '');
            element.value = "";
          }
        }
      });
    });
  }
}

// поява alert

function showAlertMessges(txt, error = false) {
  const alertInfo = document.querySelector('#alert');
  alertInfo.classList.remove('hide');
  alertInfo.innerText = txt;

  if (error === true) {
    alertInfo.classList.add('error');
  }

  setTimeout(function () {
    alertInfo.classList.add('hide');
    alertInfo.innerText = '';
    alertInfo.classList.remove('error');
  }, 2000)
}

showAlertMessges(`Я з'являюсь на 2 секунди`, true)

// додати дитину

const childrensGroup = document.querySelector('.childrens');
const childList = document.querySelector('.child__list');
const newChildren = document.querySelector('.children__info');

function childAction() {
  childrensGroup.addEventListener('click', (event) => {

    let target = event.target;
    const addChildrenBtn = target.classList.contains('btn__add');

    if (addChildrenBtn) {
      const newChildrenСlone = newChildren.cloneNode(true);

      childList.append(newChildrenСlone);
      newChildrenСlone.querySelector('.form__group-remove').style.display = 'block';

      newChildrenСlone.querySelectorAll('input[type="text"]').forEach(element => {
        element.value = '';
        makeСhoice();
      });

      newChildrenСlone.querySelectorAll('input[type="checkbox"]').forEach(element => {
        element.checked = false;
      });
    }

    let removeBtn = target.classList.contains('form__group-remove');

    if (removeBtn) {
      childList.removeChild(target.closest('.children__info'));
    }
  });
};

childAction();