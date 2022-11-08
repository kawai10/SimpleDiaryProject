import { useNavigate, useSearchParams } from 'react-router-dom';

const Edit = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const navigate = useNavigate();

	const id = searchParams.get('id');
	const mode = searchParams.get('mode');

	return (
		<div>
			<h1>Edit</h1>
			<button
				onClick={() =>
					setSearchParams({
						who: 'winter',
					})
				}>
				QS 바꾸기
			</button>
			<button onClick={() => navigate('/')}>Home 가기</button>
			<button onClick={() => navigate(-1)}>뒤로가기</button>
		</div>
	);
};

export default Edit;
