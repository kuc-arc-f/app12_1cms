//
class PagesRow extends React.Component {
    componentDidMount(){
//        console.log(this.props.obj)
    }
    render(){
// console.log(this.props.obj.title )
        return (
        <span>
            <a className="btn btn-outline-dark ml-2 mb-2"
             href={"/pages/"+ this.props.obj._id} target="_blank">{this.props.obj.title}
            </a>
        </span>
        )
    }
}

