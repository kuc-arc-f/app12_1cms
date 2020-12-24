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
                <h3>{this.props.obj.name}</h3>
                <a href={"/cms_category/edit/"+ this.props.obj._id}> [ edit ]
                </a><br />
                {this.props.obj.date_str}

            </td>
            <td>
            </td>
        </tr>
        )
    }
}

