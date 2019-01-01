import React from 'react';

const JumbotronArrows = ({ goToPrevSlide, goToNextSlide, currentIndex }) => (
  <section className={`arrow-icons-container`}>
    <div className="backArrow">
      {currentIndex > 0 && (
        <i className="fas fa-angle-left jumbo-arrow" onClick={goToPrevSlide} />
      )}
    </div>
    <div className="nextArrow">
      <i className="fas fa-angle-right jumbo-arrow" onClick={goToNextSlide} />
    </div>
  </section>
);

export default JumbotronArrows;
