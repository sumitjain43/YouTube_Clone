import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../redux/menuToggleSlice';
import { useSearchParams, Link } from 'react-router-dom';
import { YOUTUBE_VIDEO_WATCH_API, YOUTUBE_API } from '../utils/constants';
import { formatCompactNumber } from '../utils/helper';
import CommentsContainer from './CommentsContainer';
import likeIcon from '../assets/like.svg';
import disLikeIcon from '../assets/dislike.svg';
import shareIcon from '../assets/share.svg';
import downloadIcon from '../assets/download.svg';
import moreIcon from '../assets/more.svg';
import LiveChat from './LiveChat';

const WatchVideo = () => {
    const [searchParams] = useSearchParams();
    const [video, setVideo] = useState({});
    const [relatedVideos, setRelatedVideos] = useState([]);

    const videoId = searchParams.get('v');
    const isMenuOpen = useSelector(store => store.menu.isMenuOpen);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(closeMenu());

        const getVideoDetails = async () => {
            try {
                const [watchVideoRes, recVideoRes] = await Promise.all([
                    fetch(YOUTUBE_VIDEO_WATCH_API + videoId),
                    fetch(YOUTUBE_API)
                ]);
                if (!watchVideoRes.ok || !recVideoRes.ok) throw new Error("Failed to fetch data");

                const watchVideoJson = await watchVideoRes.json();
                const recVideoJson = await recVideoRes.json();

                setVideo(watchVideoJson?.items?.[0] || {});
                setRelatedVideos(recVideoJson?.items || []);
            } catch (error) {
                console.error("Error fetching video details:", error);
            }
        };

        getVideoDetails();
    }, [videoId]);

    return (
        <div className={`${!isMenuOpen ? 'px-20 ' : 'px-3 backdrop-blur-sm bg-white'} col-span-10 pt-6 flex w-full mt-[40px]`}>
            <div className='flex-grow-6'>
                <div>
                    <iframe
                        width="1200"
                        height="600"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                    <div className='p-2 m-2'>
                        <div>
                            <div className='font-medium text-[18px]'>{video?.snippet?.title || "Title not available"}</div>
                            <div className='mt-2 flex justify-between'>
                                <div className='flex'>
                                    <div className='flex'>
                                        <img className='rounded-full w-10 h-10' alt='thumbnail' src={video?.snippet?.thumbnails?.default?.url || ''} />
                                        <div className='flex flex-col justify-center ml-2'>
                                            <div className='font-bold text-[16px]'>{video?.snippet?.channelTitle || "Unknown Channel"}</div>
                                            <div className='text-gray-500 text-[12px]'>{formatCompactNumber(video?.statistics?.viewCount) || 0} Subscribers</div>
                                        </div>
                                    </div>
                                    <button className='bg-red-600 hover:bg-red-700 rounded-full px-4 ml-2 text-white font-semibold'>
                                        Subscribe
                                    </button>
                                </div>
                                <div className='flex'>
                                    <button className='bg-gray-100 rounded-l-full px-4 hover:bg-gray-200 flex items-center'>
                                        <img alt='likeBtn' className='inline-block mr-1' src={likeIcon} /> 65K
                                    </button>
                                    <button className='bg-gray-100 rounded-r-full px-4 border-l-2 border-gray-300 hover:bg-gray-200 flex items-center'>
                                        <img alt='dislikeBtn' className='inline-block' src={disLikeIcon} />
                                    </button>
                                    <button className='bg-gray-100 rounded-full px-4 ml-2 hover:bg-gray-200 flex items-center'>
                                        <img alt='shareBtn' className='inline-block mr-1' src={shareIcon} /> Share
                                    </button>
                                    <button className='bg-gray-100 rounded-full px-4 ml-2 hover:bg-gray-200 flex items-center'>
                                        <img alt='downloadBtn' className='inline-block mr-1' src={downloadIcon} /> Download
                                    </button>
                                    <button className='bg-gray-100 rounded-full w-10 h-10 ml-2 hover:bg-gray-200 flex items-center justify-center'>
                                        <img alt='moreBtn' className='inline-block' src={moreIcon} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-2 m-2'>
                        <CommentsContainer />
                    </div>
                </div>
            </div>
            <div className='flex-grow-3'>
                <div className='flex flex-col w-full'>
                    <div className='px-3 m-1 flex w-full '>
                        <LiveChat />
                    </div>
                    {relatedVideos?.map(video => (
                        <Link key={video?.id} to={`/watch?v=${video?.id}`} onClick={() => window.scrollTo(0, 0)}>
                            <div className='px-3 m-2 mt-[20px] flex'>
                                <img className='rounded-xl w-[168px] h-[94px]' alt='thumbnail' src={video?.snippet?.thumbnails?.medium?.url || ''} />
                                <ul className='flex flex-col justify-start ml-2 w-60'>
                                    <li className='font-medium py-2 text-[14px] line-clamp-2 max-h-[50px] leading-5'>{video?.snippet?.title || "No Title"}</li>
                                    <li className='text-gray-500 text-[12px]'>{video?.snippet?.channelTitle || "Unknown Channel"}</li>
                                    <li className='text-gray-500 text-[12px]'>
                                        100 views {(Math.abs(new Date(video?.snippet?.publishedAt) - new Date()) / (60 * 60 * 24 * 1000)).toFixed(1)} days ago
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WatchVideo;
