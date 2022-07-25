import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";


function HomePage2() {
    return(
        <main>
          <div className='part7'>
            <h2>
                Popular groups
            </h2>
            <div className='part7Div'>
                <div className='part7Card'>
                    <div>
                        <img src=''></img>
                        <div>
                            <p className='part7CardNewGroup'>
                                New Group
                            </p>
                            <h4>

                            </h4>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
          </div>

        <div className='part8'>
            <div className='part8Left'>
                    <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658780015/WeMeet/ScreenIos_fqphd6.webp'></img>

            </div>
            <div className='part8Middle'>
                    <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658780015/WeMeet/applogo_v6ct3h.png'></img>
                    <p className='part8Title'>
                        Stay connected.
                    </p>
                    <p className='part8Title'>
                        Download the app.
                    </p>
                    <div className='download'>
                        <a target="_blank" href='https://apps.apple.com/us/app/meetup/id375990038'>
                            <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658780015/WeMeet/download_en-US_wqm4tx.svg'></img>
                        </a>
                        <a target="_blank" href='https://play.google.com/store/apps/details?id=com.meetup&hl=en-US'>
                            <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658780015/WeMeet/download_en-US_1_ggkmvj.svg'></img>
                        </a>

                    </div>
                   


            </div>
                <div className='part8Right'>
                    <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658780015/WeMeet/ScreenAndroid_p4oq3o.webp'></img>
                </div>

            </div>

            <div className='part9'>
                <div className='part9Title'>
                    <h2>
                        Stories from Meetup
                    </h2>
                    <p className='part9Title center'>
                        People on Meetup have fostered community, learned new skills, started businesses, and made life-long friends. Learn how.
                    </p>
                </div>
                <div className='part9CardContiner'>
                    <div className='part9Card'>
                        
                        <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658783083/WeMeet/first_article_ag4rap.webp'></img>
                        <a target="_blank" href="https://www.meetup.com/blog/three-ways-to-make-coworker-friendships-while-working-from-home/">
                            <h4>
                                Three Ways To Make Coworker Friendships While Working From Home
                            </h4>
                        </a>
                        <p>
                            Work friendships don’t need to fade just because you’re working remotely. Here are three fun ways you can get to know your colleagues.
                        </p>
                    </div>
                    <div className='part9Card'>

                        <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658783083/WeMeet/second_article_m38aub.webp'></img>
                        <a target="_blank" href="https://www.meetup.com/blog/three-ways-to-make-coworker-friendships-while-working-from-home/">
                            <h4>
                                Three Ways To Make Coworker Friendships While Working From Home
                            </h4>
                        </a>
                        <p>
                            Since Meetup began nearly 20 years ago, we’ve fostered connections between more than 50 million people in 190 countries worldwide. Here are five simple strategies to help you feel more connected and improve your wellbeing.
                        </p>
                    </div>
                    <div className='part9Card'>

                        <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658783083/WeMeet/third_article_ujo9yu.webp'></img>
                        <a target="_blank" href="https://www.meetup.com/blog/how-to-live-your-best-social-life/">
                            <h4>
                                How To Live Your Best Social Life
                            </h4>
                        </a>
                        <p>
                            Social interaction is a key part of any healthy lifestyle. Discover all different kinds of events that’ll help you maintain a fun and fulfilling social life.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default HomePage2;