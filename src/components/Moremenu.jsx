import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import './Moremenu.css'
import { nanoid } from 'nanoid'

function Moremenu() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const { sec, nm } = useParams();
    const allTypes = [];
    let prevtype = null

    useEffect(() => {
        fetch('../../data/db.json')
            .then(res => res.json())
            .then(res => {
                setData(res.menu);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);





    if (loading) {
        return (
            <div>
                loading
            </div>);
    }

    return (
        <div>
            <div className="headerinMenu">
                <div className="headerinMenuWrap">
                    <NavLink to='/menu'>Menu <span></span></NavLink>
                    <NavLink to='/features'>Featured <span></span></NavLink>
                    <NavLink to='/prev'>Previous <span></span></NavLink>
                    <NavLink to='/favorites'>Favorites <span></span></NavLink>
                </div>
            </div>
            <section className="menu">
                <div>
                    <div className="moreMenuWrap">
                        <div className="menuWithText">
                            {Object.keys(data).map((itm, index) => {
                                return (
                                    <div key={index} className="menuTextSec">
                                        <div className="menuHead">
                                            <h2>{itm.slice(0, 1).toUpperCase() + itm.slice(1)}</h2>
                                        </div>
                                        <div className="products">
                                            {data[itm]?.map((item, index) => {
                                                return (
                                                    <Link to={`/menu/${itm}/${item.name}`} key={nanoid()}>
                                                        <h3>{item.name}</h3>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}


                        </div>
                        {data[sec]?.map((item) => {

                            if (item.name === nm) {
                                item.more.forEach((itm) => {
                                    allTypes.push(itm.type);
                                });
                            }
                        })}

                        <div className="menuWithPhotos">
                            <p><Link to='/menu'>Menu</Link> / <span>{nm}</span></p>
                            <div className="MenuSec">
                                <h2>{nm.slice(0, 1).toUpperCase() + nm.slice(1)}</h2>
                                {allTypes.map((type) => {
                                    if (prevtype != type) {

                                        prevtype = type
                                        return (
                                            <div key={nanoid()} className='productsWrap'>
                                                <h2 style={{display:`${(type=='null')? "none" : "flex" }`}} >{type}</h2>
                                                <div className="products">
                                                    {data[sec]?.map((item) => {

                                                        if (item.name === nm) {
                                                            return item.more.map((itm) => {
                                                                if(itm.type==type){
                                                                return (
                                                                    <Link to={`/menu/${sec}/${item.name}/${itm.name}`} key={nanoid()}>
                                                                        <img src={"https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211210_MochaCookieCrumbleFrapp.jpg?impolicy=1by1_tight_288"} alt="" />
                                                                        <h3>{itm.name}</h3>
                                                                    </Link>
                                                                );}
                                                            });
                                                        }
                                                    })}

                                                </div>
                                            </div>)
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Moremenu