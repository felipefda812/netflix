import React,{useEffect,useState} from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';

export default() => {

    const[movieList, setMoviesList] = useState([]);
    const [featuredData, setFeaturedData] = useState([]);
    const [blackHeader, setBlackHeader] = useState (true);

  useEffect(()=>{
    const loadAll = async () =>{
     //Pegando a lista total 
      let list = await Tmdb.getHomeList ();
      setMoviesList(list);

      //Pegando o Featured
      let originals = list.filter (i=>i.slug==='originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
      console.log (chosenInfo);

    }
          loadAll();

  },[]);

  useEffect(()=>{
      const scrollListener =()=> {
        if(window.scrollY > 10){
          setBlackHeader (true);
        } else {
          setBlackHeader (false);
        }

      }
          window.addEventListener ('scroll', scrollListener);
            return ()=>{
                window.removeEventListener('scroll',scrollListener);

            }

  },[]);

        return (
        <div className ="page">
          <Header black={blackHeader}/>

          {featuredData &&
          <FeatureMovie item={featuredData}/>
          }
          <section className="lists">
            {movieList.map((item,key)=>(
              <MovieRow key={key} title={item.title} items={item.items}/>
            ))}
              </section>
              <footer>
                Feito com <span role="imf" aria-aria-label="coração"> ❤️ </span> por Felipe Alves <br/>
                Direitos de imagem para Netflix <br/>
                Dados coletados do site Themoviedb.org .<br/>

              </footer>

              {movieList.length <= 0 &&
                <div className="loading"> 
                  <img src="https://c.tenor.com/Rfyx9OkRI38AAAAC/netflix-netflix-startup.gif" aria-label alt="Carregando"/>
                </div>
              }
            </div>
    );
};