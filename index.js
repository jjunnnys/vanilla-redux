import { createStore } from 'redux';

const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

/* 액션 타입과 액션 생성 함수 정의 */

// 액션 이름
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 액션 생성함수 정의
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE });
const decrease = () => ({ type: DECREASE });

/* 초기 값 설정 */

const initialState = {
  toggle: false,
  counter: 0,
};

/* 리듀서 함수 정의 */

// state가 undefined일 때는 initialState를 기본값으로 사용 (리듀서 함수가 처음 호출될 때는 초기 값이 undefined)
const reducer = (state = initialState, action) => {
  // action.type에 따라 다른 작업을 처리함
  switch (action.type) {
    case 'TOGGLE_SWITCH':
      return {
        ...state, // 불변성 유지를 해 주어야 한다. (리덕스의 상태는 최대한 깊지 않은 구조로 진행)
        toggle: !state.toggle,
      };
    case 'INCREASE':
      return {
        ...state, // 불변성 유지를 해 주어야 한다.
        counter: state.counter + action.difference,
      };
    case 'DECREASE':
      return {
        ...state, // 불변성 유지를 해 주어야 한다.
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

/* 스토어 만들기 */

const store = createStore(reducer);

/* render 함수 만들기 */

// 상태가 업데이트도리 때마다 호출, 리액트의 render 함수와는 다르게 이미 html을 사용하여 만들어진 UI의 속성을 상태에 따라 변경
const render = () => {
  const state = store.getState(); // 현재 상태를 불러옴

  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add('active');
  } else {
    divToggle.classList.remove('active');
  }

  // 카운터 처리
  counter.innerText = state.counter;
};
