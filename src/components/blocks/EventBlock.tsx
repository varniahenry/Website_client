import { EventBlockProps } from '@/types';
import { formatDate, formatTime } from '@/utils/format-date';
import Link from 'next/link';

export function EventBlock({ events, heading }: Readonly<EventBlockProps>) {
  return (
    <section className='bg-black/70 py-5 px-5 md:p-16 w-screen'>
      <div className=' max-w-screen-xl m-auto px-10'>
        <h3 className=' text-5xl md:text-6xl text-[#E7CD78] text-center underline decoration-white mb-5 md:mb-10'>
          {heading}
        </h3>
        {events?.length === 0 || events === undefined || events === null ? (
          <p className='text-xl md:text-4xl text-center'>No Upcoming Events</p>
        ) : (
          events?.map((event, index) => (
            <div key={event.venue + index.toString()}>
              <hr className='w-full sm:w-[75%] justify-self-center mb-4' />
              {/* <div className='  md:ml-20 lg:ml-40 mt-5 text-center sm:text-left'> */}
              <div className='  text-center mb-5'>
                <h4 className='text-2xl mb:text-3xl'>{event.venue}</h4>
                <div>
                  <p className='mb-2 italic'>
                    {formatDate(event.date)}, {formatTime(event.startTime)} -{' '}
                    {formatTime(event.endTime)}
                  </p>

                  <p className='mb-2 event-p'>
                    {event.address}
                    <br />
                    {event.city}, {event.province}
                    <br />
                    {event.country}
                    <br />
                  </p>
                  {event.description}
                </div>
              </div>
              {index === events.length - 1 && (
                <hr className='w-full sm:w-[75%] justify-self-center' />
              )}
            </div>
          ))
        )}
        <div className='w-full  text-center pt-10 pb-20'>
          <Link
            className='text-black hover:bg-white  bg-[#E7CD78] text-3xl md:text-5xl font-bold p-2 rounded-3xl  '
            href={'/contact'}>
            {'Book Now'}
          </Link>
        </div>
      </div>
    </section>
  );
}
