  //ここから部ファイルに切り出しできるはず。
  class AppBase extends React.Component {
  constructor(props) {
  super(props);
  var index = 0
  this.state = {
  data: this.props.data,
  index: index
  }

  this.nextpage = this.nextpage.bind(this);
  this.prevpage = this.prevpage.bind(this);
  }

  render() {
  var dt = this.state.data[this.state.index];

  var saveFlg = ( this.state.data.length == this.state.index+1 );
  return (
  <div className="App">
  <QAIndicator total={this.state.data.length} now={this.state.index+1} />
  <div className="form-group">
      <Page oid={dt[0]} type={dt[1]} text={dt[2]} vals={dt[3]} />
  </div>
  <Pagenation flg={saveFlg} prevpage={this.prevpage} nextpage={this.nextpage} savepage={this.props.savepage}/>
  </div>
  );

  }
  // ���y�[�W�{�^���������Ƃ�
  nextpage() {
  if (this.state.data.length > this.state.index + 1) {
  this.setState({
  index: this.state.index += 1
  });
  }
  }

  // �O�y�[�W�{�^���������Ƃ�
  prevpage() {
  if (this.state.index > 0) {
  this.setState({
  index: this.state.index -= 1
  });
  }
  }

  update(setAry) {
  this.setState({
  index: setAry
  });
  }
  }

  class QAIndicator extends React.Component {
  render() {
  const items = [];
  for (let i = 1; i <= this.props.total; i++) {
  if (this.props.now == i){
  items.push(
      <IndicatorMod class="●" />
  )
  }
  else{
  items.push(
      <IndicatorMod  class="〇" />
  )
  }
  }
  return <div className="QAIndicator">{items}</div>
  }
  }
  class IndicatorMod extends React.Component
  {
  render(){
  return <div className="Indicator" >{this.props.class}</div>
  }
  }
  class Page extends React.Component {
  render() {
  return (
  <section className="Page">
  <div className="Contents">
      <form>
          <QuestionMod text={this.props.text} />
          <AnswerMod oid={this.props.oid} type={this.props.type} vals={this.props.vals} />
      </form>
  </div>
  </section >
  )
  }
  }

  class QuestionMod extends React.Component {
  render() {
  return (
  <label className="Question">{this.props.text}</label>
  );
  }
  }

  class AnswerMod extends React.Component {
  render() {
  if (this.props.type == 'text'){
  return <TextMod key={this.props.oid}  id={this.props.oid} val={"1"} />;
  }
  else if (this.props.type == 'check'){
  var ary = this.props.vals;
  return (<div>
  {ary.map((val,index) =>{
      return <CheckMod  key={this.props.oid}   id={this.props.oid} index={index} val={val}/>;
  })}</div>
  );
  }
  else if (this.props.type == 'radio'){
  var ary = this.props.vals;
  return (<div>
  {ary.map((val,index) =>{
      return <RadioMod  key={this.props.oid}  id={this.props.oid} index={index} val={val}/>;
  })}</div>
  );
  }
  else{
  //          return <p>!!</p>
  }
  }
  }

  class TextMod extends React.Component{
  constructor(props) {
  super(props);
  this.state = {
  id : this.props.id,
  textValue: this.props.val
  }

  this.changeText = this.changeText.bind(this);

  }

  changeText(e) {
  this.setState({textValue: e.target.value});
  saveData[this.props.id] = e.target.value
  console.log("set",saveData[this.props.id],this.state.textValue);
  }

  render(){
  return (
  <div class="form-group">
      <input type="text" className="form-control" id={"txt_" + this.props.id} key={"txt_" + this.props.id} value={this.state.textValue} onChange={this.changeText}/>
  </div>
  );
  }
  }

  class CheckMod extends React.Component{
  constructor(props) {
  super(props);
  this.state = {
  id : this.props.id,
  checked: false
  }

  this.changeState = this.changeState.bind(this);

  if (saveData[this.props.id] == null){
  saveData[this.props.id] = {};
  var key = {};
  key[this.props.index] = this.state.checked;
  saveData[this.props.id] = key;
  }
  else{
  // �l�������Ȃ�
  if( saveData[this.props.id][this.props.index] != null){
  this.setState({checked: saveData[this.props.id][this.props.index]});
  }
  }
  }
  changeState(e) {
  this.setState({checked: e.target.checked});
  saveData[this.props.id][this.props.index] = e.target.checked;
  }

  render() {
  return (
  <p  key={"pchk_" + this.props.id + "_" + this.props.index}>
  <input type="checkbox" className="form-control" name={"chk_" + this.props.id} key={"chk_" + this.props.id + "_" + this.props.index} onChange={this.changeState} />{this.props.val}
  </p>
  );
  }
  }

  class RadioMod extends React.Component{
  constructor(props) {
  super(props);
  this.state = {
  id : this.props.id,
  checked: false
  }

  this.changeState = this.changeState.bind(this);

  if (saveData[this.props.id] == null){
  saveData[this.props.id] = {};
  saveData[this.props.id] = this.props.index + ":" + this.state.checked;
  }
  else{
  // �l�������Ȃ�
  if( saveData[this.props.id] != null){
  var index = saveData[this.props.id].split(':')[0];
  var val = saveData[this.props.id].split(':')[1];

  if (index == this.props.index ) {
    this.setState({checked: val});
  }
  }
  }
  }
  changeState(e) {
  this.setState({checked: e.target.checked});
  saveData[this.props.id] = this.props.index + ":" + e.target.checked;
  }

  render() {
  return (
  <p key={"prdo_" + this.props.id + "_" + this.props.index}>
  <input type="radio" className="form-control" name={"rdo_" + this.props.id} key={"rdo_" + this.props.id + "_" + this.props.index} onChange={this.changeState} />{this.props.val}
  </p>
  );
  }
  }

  class Pagenation extends React.Component {
  render() {

  if (this.props.flg){
  return (
  <section className="Pagenation">
      <PagenationButton name="prevPage leftBtn" text="prev" event={this.props.prevpage} />
      <PagenationButton name="savePage rightBtn" text="save" event={this.props.savepage} />
  </section >
  );

  }

  return (
  <section className="Pagenation">
  <PagenationButton name="prevPage leftBtn" text="prev" event={this.props.prevpage} />
  <PagenationButton name="nextPage rightBtn" text="next" event={this.props.nextpage} />
  </section >
  );
  }
  }

  class PagenationButton extends React.Component {
  render() {
  return (
  <div className={this.props.name} onClick={this.props.event}>{this.props.text}</div>
  );
  }
  }
