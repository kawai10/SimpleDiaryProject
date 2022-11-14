import React, { useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

const reducer = (state, action) => {
	let newState = [];
	switch (action.type) {
		case 'INIT': {
			return action.data;
		}
		case 'CREATE': {
			newState = [action.data, ...state];
			break;
		}
		case 'REMOVE': {
			newState = state.filter(element => element.id !== action.targetId);
			break;
		}
		case 'EDIT': {
			newState = state.map(element =>
				element.id === action.data.id ? { ...action.data } : element,
			);
			break;
		}
		default:
			return state;
	}
	return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
	{
		id: 1,
		emotion: 1,
		content: '111111111',
		date: 1668149416386,
	},
	{
		id: 2,
		emotion: 2,
		content: '222222222',
		date: 1668149416387,
	},
	{
		id: 3,
		emotion: 3,
		content: '3333333333',
		date: 1668149416388,
	},
	{
		id: 4,
		emotion: 4,
		content: '4444444444',
		date: 1668149416389,
	},
	{
		id: 5,
		emotion: 5,
		content: '55555555555',
		date: 1668149416390,
	},
];

function App() {
	const [data, dispatch] = useReducer(reducer, dummyData);

	//CREATE
	const dataId = useRef(0);
	const onCreate = (date, content, emotion) => {
		dispatch({
			type: 'CREATE',
			data: {
				id: dataId,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
		dataId.current += 1;
	};

	//REMOVE
	const onRemove = targetId => {
		dispatch({
			type: 'REMOVE',
			targetId,
		});
	};
	//EDIT
	const onEdit = (targetId, date, content, emotion) => {
		dispatch({
			type: 'EDIT',
			data: {
				id: targetId,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
	};

	return (
		<DiaryStateContext.Provider value={data}>
			<DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
				<BrowserRouter>
					<div className="App">
						<Routes>
							<Route path={'/'} element={<Home />} />
							<Route path={'/new'} element={<New />} />
							<Route path={'/edit/:id'} element={<Edit />} />
							<Route path={'/diary/:id'} element={<Diary />} />
						</Routes>
					</div>
				</BrowserRouter>
			</DiaryDispatchContext.Provider>
		</DiaryStateContext.Provider>
	);
}

export default App;
