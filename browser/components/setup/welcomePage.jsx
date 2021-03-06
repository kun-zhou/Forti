import React from 'react'
import sty from './setup.cssm'
import ComposeNewDB from './composeNewDB/composeNewDB.jsx'

export default class WelcomePage extends React.PureComponent {
    constructor() {
        super()
        this.state = { message: '' }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.status === 'DB_CREATED')
            this.props.triggerWelcomeBack()
    }

    createVault = (name, passwd) => {
        var { success, message } = this.props.setupDB(name, passwd)
        if (success) {
            this.props.triggerWelcomeBack()
        } else {
            message = message === 'PASSWORD_INVALID' ?
                'Password needs to be at least 8 characters long' :
                message
            this.setState({ message })
        }
    }
    
    render() {
        var helperText = ' '
        var status = this.props.status
        if (status !== 'WELCOME') {
            if (status === 'PASSWORD_INVALID')
                helperText = 'Your password must be 8 characters long'
            else helperText = status
        }
        return (
            <div className={sty['wrapper-row']}>
                <div className={sty['header-setup']}>
                    <p className={sty['app-title']}>LOCK.IT</p>
                    <p className={sty['app-title-footnote']}>a safe home for all your secrets</p>
                </div>
                <div className={sty['body-setup']}>
                    <section className={sty['setup-section'] + ' ' + sty['about-vault']}>
                        <h2>VAULT</h2>
                        <p>Each vault is a standalone encrypted databse capable of storing your private information.</p>
                        <p>Multiple vaults are supported in this app if you desire seperation of storage for various occasions.</p>
                    </section>
                    <section className={sty['setup-section'] + ' ' + sty['getting-started']}>
                        <h2>Getting Started !</h2>
                        <p>Please enter the name and password for your first vault ;-)</p>
                        <ComposeNewDB onSubmit={this.createVault} />
                        <p style={{ height: '30px', color: 'red' }}>{this.state.message}</p>
                    </section>
                </div>
            </div>
        )
    }
}