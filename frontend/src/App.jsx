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
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
	const [data, dispatch] = useReducer(reducer, []);

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
			<DiaryDispatchContext.Porvider value={{ onCreate, onRemove, onEdit }}>
				<BrowserRouter>
					<div className="App">
						<Routes>
							<Route path={'/'} element={<Home />} />
							<Route path={'/new'} element={<New />} />
							<Route path={'/edit'} element={<Edit />} />
							<Route path={'diary/:id'} element={<Diary />} />
						</Routes>
					</div>
				</BrowserRouter>
			</DiaryDispatchContext.Porvider>
		</DiaryStateContext.Provider>
	);
}

export default App;
