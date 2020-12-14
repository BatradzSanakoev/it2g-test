import React from 'react';

export default function Preloader({ isLoadError, isLoading }) {

    const sectionPreloaderVisible = (!isLoadError && !isLoading) && 'preloader__visible';
    const circleVisible = !isLoading && 'preloader__visible';
    const containerVisible = !isLoadError && 'preloader__visible';
    const containerText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
    return (
        <section className={`preloader ${sectionPreloaderVisible}`}>
            <i className={`circle-preloader ${circleVisible}`} />
            <div className={`preloader__container ${containerVisible}`}>
                <p className='preloader__text'>{containerText}</p>
            </div>
        </section>
    )
}