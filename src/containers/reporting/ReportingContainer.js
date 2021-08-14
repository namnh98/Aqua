import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import ReportingComponent from '../../components/reporting/ReportingComponent'
class ReportingContainer extends Component {


    render() {
        return <ReportingComponent {...this.props} />
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ReportingContainer)
