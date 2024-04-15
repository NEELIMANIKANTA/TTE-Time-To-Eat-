import './navstyles.css';


function Home()
{
    return (<>
            <section className="hero-section">
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/wallper.jpg" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="/images/reso1.png" className="d-block w-100" alt="Slide2" />
          </div>
          <div className="carousel-item">
            <img src="/images/reso3.gif" className="d-block w-100" alt="Slide 3" />
          </div>
          <div className="carousel-item">
            <img src="/images/rseo2.jpg" className="d-block w-100" alt="Slide 4" />
          </div>
          <div className="carousel-item">
            <img src="/images/meal2.jpg" className="d-block w-100" alt="Slide 5" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      </section>
    
    
    </>
       
    );
}
export default Home;