import MyHeader from './MyHeader';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from '../App';

const emotionList = [
	{
		emotion_id: 1,
		emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
		emotion_description: '완전 좋음',
	},
	{
		emotion_id: 2,
		emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
		emotion_description: '좋음',
	},
	{
		emotion_id: 3,
		emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
		emotion_description: '그럭저럭',
	},
	{
		emotion_id: 4,
		emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
		emotion_description: '나쁨',
	},
	{
		emotion_id: 5,
		emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
		emotion_description: '끔찍함',
	},
];

const getStringDate = data => {
	return data.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
	const navigate = useNavigate();
	const [date, setDate] = useState(getStringDate(new Date()));
	const [emotion, setEmotion] = useState(3);
	const [content, setContent] = useState('');
	const contentRef = useRef();
	const { onCreate } = useContext(DiaryDispatchContext);

	const handleSubmit = () => {
		if (content.length < 1) {
			contentRef.current.focus();
			return;
		}

		onCreate(date, content, emotion);
		navigate('/', { replace: true });
	};

	const handleClickEmote = emotion => {
		setEmotion(emotion);
	};

	return (
		<div className={'DiaryEditor'}>
			<MyHeader
				headText={'새 일기 쓰기'}
				leftChild={
					<MyButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />
				}
			/>
			<div>
				<section>
					<h4>오늘은 언제인가요?</h4>
					<div className={'input_box'}>
						<input
							className={'input_date'}
							value={date}
							type={'date'}
							onChange={e => setDate(e.target.value)}
						/>
					</div>
				</section>
				<section>
					<h4>오늘의 감정</h4>
					<div className={'input_box emotion_list_wrapper'}>
						{emotionList.map(element => (
							<EmotionItem
								key={element.emotion_id}
								{...element}
								onClick={handleClickEmote}
								isSelected={element.emotion_id === emotion}
							/>
						))}
					</div>
				</section>
				<section>
					<h4>오늘의 일기</h4>
					<div className={'input-box text_wrapper'}>
						<textarea
							ref={contentRef}
							value={content}
							onChange={e => setContent(e.target.value)}
						/>
					</div>
				</section>
				<section className={'control_box'}>
					<MyButton text={'취소하기'} onClick={() => navigate(-1)} />
					<MyButton
						text={'작성완료'}
						type={'positive'}
						onClick={handleSubmit}
					/>
				</section>
			</div>
		</div>
	);
};

export default DiaryEditor;
