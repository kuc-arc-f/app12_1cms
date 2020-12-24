class IndexRow extends React.Component {
    componentDidMount(){
//        console.log(this.props.obj)
    }
    render(){
        return (
        <tr>
            <td>
                {this.props.obj._id}
            </td>
            <td>
                <a href={"/cms_pages/show/"+ this.props.obj._id}><h3>{this.props.obj.title}</h3>
                </a>                
                <a href={"/cms_pages/edit/"+ this.props.obj._id}> [ edit ]
                </a><br />
                {this.props.obj.created_at}

            </td>
            <td>
            </td>
        </tr>
        )
    }
}

