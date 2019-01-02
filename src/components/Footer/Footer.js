import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  state = {
    isEnd: false
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.checkEndPosition, true);
  };

  redirect = link => {
    const newTab = window.open(link, '_blank');
    newTab.focus();
  };

  checkEndPosition = event => {
    const { scrollHeight, clientHeight, scrollTop } = event.target;
    clientHeight === scrollHeight - scrollTop
      ? this.setState({ isEnd: true })
      : this.setState({ isEnd: false });
  };

  render() {
    const contributors = [
      {
        name: 'Paul Kim',
        ghLink: 'https://github.com/sojurner',
        website: 'http://paul-kim-developer.netlify.com/'
      },
      {
        name: 'Gray Smith',
        ghLink: 'https://github.com/GraySmith00',
        website: 'https://graysmith00.github.io/portfolio/'
      },
      {
        name: 'Cody Taft',
        ghLink: 'https://github.com/codytaft',
        website: 'https://www.linkedin.com/in/codytaft/'
      }
    ];
    const { isEnd } = this.state;
    return (
      <footer className={isEnd ? 'footer-show' : 'footer-hide'}>
        <p className="copyright"> © 2018</p>
        {contributors.map(contributor => {
          return (
            <div className="footer-contributor-content">
              <p className="footer-author">{contributor.name}</p>
              <div className="footer-icon-list">
                <i
                  onClick={this.redirect.bind(null, contributor.ghLink)}
                  className="fab fa-github-alt"
                />
                <i
                  onClick={this.redirect.bind(null, contributor.website)}
                  className="fas fa-sitemap"
                />
              </div>
            </div>
          );
        })}
      </footer>
    );
  }
}
export default Footer;
