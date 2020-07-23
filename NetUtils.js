import React, {Component} from 'react';
export default class NetUtils extends Component {
  static get(url, callback) {
        const otl = {
            method: 'GET',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
        }
    fetch(url, otl)
      .then((response) => response.json())
            .then((json) => {
        callback(json);
            }).catch(error => {
        alert(error);
        })
  }

}
