import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import MyHeader from '../components/MyHeader';
import { getStringDate } from '../util/date';
import MyButton from '../components/MyButton';
import { emotionList } from '../util/emotion';

const Diary = () => {
	const { id } = useParams();
	const diaryList = useContext(DiaryStateContext);
	const navigate = useNavigate();
	const [data, setData] = useState();

	useEffect(() => {
		if (diaryList.length >= 1) {
			const targetDiary = diaryList.find(
				element => parseInt(element.id) === parseInt(id),
			);

			if (targetDiary) {
				setData(targetDiary);
			} else {
				navigate('/', { replace: true });
			}
		}
	}, [id, diaryList]);

	if (!data) {
		return <div className={'DiaryPage'}>로딩중입니다....</div>;
	} else {
		const currentEmotionData = emotionList.find(
			element => parseInt(element.emotion_id) === parseInt(data.emotion),
		);

		console.log(currentEmotionData);

		return (
			<div className={'DiaryPage'}>
				<MyHeader
					headText={`${getStringDate(new Date(data.date))} 기록`}
					leftChild={
						<MyButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />
					}
					rightChild={
						<MyButton
							text={'수정하기'}
							onClick={() => navigate(`/edit/${data.id}`)}
						/>
					}
				/>
				<article>
					<section>
						<h4>오늘의 감정</h4>
						<div
							className={[
								'diary_img_wrapper',
								`diary_img_wrapper_${data.emotion}`,
							].join(' ')}>
							<img src={currentEmotionData.emotion_img} />
							<div className={'emotion_descript'}>
								{currentEmotionData.emotion_description}
							</div>
						</div>
					</section>
					<section>
						<h4>오늘의 일기</h4>
						<div className="diary_content_wrapper">
							<p>{data.content}</p>
						</div>
					</section>
				</article>
			</div>
		);
	}
};

export default Diary;
