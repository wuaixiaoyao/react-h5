/*
 * @Author: wuaixiaoyao 
 * @Date: 2020-04-06 18:02:36 
 * @Last Modified by: wuaixiaoyao
 * @Last Modified time: 2020-04-12 17:14:05
 */
import React from 'react'
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

export default class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    // 这部分代码很糟，而且还有 bug
    let words = this.state.words;
    //words.push('marklar111');
    words = [...words, '1234']
    this.setState({words: words});
    // // 这部分代码很糟，而且还有 bug
    // //const words = this.state.words;
    // //words.push('我司1244');
    // this.setState(state => ({
    //   words: state.words.push('我司1244')
    // }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>点击增加数组项目</button>
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}

