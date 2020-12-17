class Scorecard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement(Header, null),
      React.createElement(Left, null),
      React.createElement(Score, { type: "live" }),
      React.createElement(Score, { type: "upcoming" })));


  }}


const Header = () => {
  return (
    React.createElement("div", null,
    React.createElement("h1", { className: "text-center" }, "Live Score!")));


};

const Left = () => {
  return (
    React.createElement("div", null,
    React.createElement("p", { className: "fixture" }, " Live and Upcoming Matches")));


};

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [] };

  }
  componentDidMount() {
    var status = this.props.type === "live" ? 3 : 1;
    setInterval(() => {
      fetch(
      `https://rest.entitysport.com/v2/matches/?status=${status}&token=437214169d9be2a73e91d22f76f68b52`).

      then(res => res.json()).
      then(
      result => {
        this.setState({
          matches: result.response.items });

      },
      error => {
        this.setState({
          error });

      });

    }, 5000);
  }

  render() {
    return (
      React.createElement("div", null,
      this.state.matches.map(match => {
        var date = new Date(match.timestamp_start * 1000);
        var localtime = date.toLocaleString();
        var array = localtime.split(",");
        var hours = array[1];
        var startdate = array[0];
        return (
          React.createElement("div", { key: match.match_id, className: "border border-bottom border-top" },
          React.createElement("div", { className: "container-fluid" },
          React.createElement("div", { className: "row" },
          React.createElement("div", { className: "col" },
          React.createElement("div", { className: "container" },
          React.createElement("div", { className: "row" },
          React.createElement("div", { className: `col ${this.props.type === 'live' ? "matchtype-live" : "matchtype-upcoming"}` },
          this.props.type === "live" ? "Live" : "Upcoming"),

          React.createElement("div", { className: "col subtitle" }, match.subtitle))),



          React.createElement("div", { className: `${this.props.type === 'live' ? "color-live" : "color-upcoming"}` }, match.venue.name),
          React.createElement("div", { className: `${this.props.type === 'live' ? "color-live" : "color-upcoming"}` }, match.venue.location),
          React.createElement("div", { className: `${this.props.type === 'live' ? "color-live" : "color-upcoming"}` }, hours, " Local Time")),

          React.createElement("div", { className: "col-7 title" },
          React.createElement("div", { className: "container" },
          React.createElement("div", { className: "row" },
          React.createElement("div", { className: "col-3 styleteam" },
          React.createElement("div", { className: "teamname" }, match.teama.name),
          React.createElement("div", null, match.teama.scores_full)),


          React.createElement("div", { className: "col styleteam" },
          React.createElement("img", {
            src: match.teama.logo_url,
            width: "50",
            height: "50" })),



          React.createElement("div", { className: `col vs ${this.props.type === 'live' ? "color-live" : "color-upcoming"}` }, "VS"),

          React.createElement("div", { className: "col-4 styleteam" },
          React.createElement("div", { className: "teamname" }, match.teamb.name),
          React.createElement("div", null, match.teamb.scores_full)),

          React.createElement("div", { className: "col styleteam" },
          React.createElement("img", {
            src: match.teamb.logo_url,
            width: "50",
            height: "50" }))))),






          React.createElement("div", { className: `col text-center styledate ${this.props.type === 'live' ? "color-live" : "color-upcoming"}` }, startdate)))));




      })));


  }}


ReactDOM.render(React.createElement(Scorecard, null), document.getElementById("main"));