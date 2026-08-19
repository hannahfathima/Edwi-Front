import React from 'react';
import './OurPromise.scss';
import { FaHandHoldingWater } from 'react-icons/fa';
import { GiPalmTree, GiSprout } from 'react-icons/gi';
import { BiLeaf } from 'react-icons/bi';

const promises = [
    {
        icon: <FaHandHoldingWater />,
        title: '100% Pure & Unrefined',
        desc: 'Pure & unrefined coconut oil from handpicked mature coconuts, preserving every natural nutrient for your wellness.'
    },
    {
        icon: <GiPalmTree />,
        title: 'Locally Sourced',
        desc: "Partnering with Kerala's coastal farmers to support communities and ensure freshness."
    },
    {
        icon: <BiLeaf />,
        title: 'Chemical-Free Guarantee',
        desc: 'Absolutely no additives, preservatives, or artificial processing.'
    },
    {
        icon: <GiSprout />,
        title: 'Sustainable Practices',
        desc: 'Environmentally conscious sourcing and packaging for a better tomorrow.'
    }
];

const OurPromise = () => {
    return (
        <section className="our-promise">
            <div className="our-promise__container">
                <div className="our-promise__header">
                    <h6><span className="our-promise__highlight">Our</span> promise</h6>
                    <p>At Edhwi, we promise more than just products — we promise purity, honesty, and care in everything we offer.</p>
                </div>

                <div className="our-promise__grid">
                    {promises.map((item, index) => (
                        <div className="our-promise__card" key={index}>
                            <div className="our-promise__icon">
                                {item.icon}
                            </div>
                            <h3 className="our-promise__title" >{item.title}</h3>
                            <p className="our-promise__desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurPromise;
