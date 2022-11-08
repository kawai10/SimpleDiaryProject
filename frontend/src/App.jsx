import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<MyHeader
					headText={'App'}
					leftChild={<MyButton text={'왼쪽 버튼'} />}
					rightChild={<MyButton text={'오른쪽 버튼'} />}
				/>
				<h1>App</h1>
				<MyButton text={'버튼'} type={'positive'} />
				<MyButton text={'버튼'} type={'negative'} />
				<MyButton text={'버튼'} />
				<Routes>
					<Route path={'/'} element={<Home />} />
					<Route path={'/new'} element={<New />} />
					<Route path={'/edit'} element={<Edit />} />
					<Route path={'diary/:id'} element={<Diary />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
