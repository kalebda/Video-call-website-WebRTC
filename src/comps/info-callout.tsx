import {
    Callout,
    ICalloutProps,
    mergeStyleSets,
    FontSizes,
    FontWeights,
    Link,
    Label,
    IconButton
} from '@fluentui/react'
import type { FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'
import { roomState } from '../atoms'

const callout = mergeStyleSets({
    container: {
        padding: '1em',
    },
    title: {
        fontSize: '1.75em',
        fontWeight: FontWeights.semilight,
        margin: '0',
    },
    secondaryTitle: {
        fontSize: '1em',
        fontWeight: FontWeights.semilight,
        margin: '.25em 0',
    },
    body: {
        margin: '.5em 0',
    },
    footer: {
        fontSize: FontSizes.smallPlus,
        marginTop: '2em',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

interface MyCalloutProps {
    showFooter?: boolean
}

const MyCallout: FunctionComponent<ICalloutProps & MyCalloutProps> = ({ showFooter, ...props }) => {
    const room = useRecoilValue(roomState)
    const link = `${window.location.origin}/room/${room?.id}`
    return (
        <Callout
            className={callout.container}
            role="dialog"
            calloutMaxWidth={400}
            // eslint-disable-next-line
            {...props}
        >
            <h1 className={callout.title}>{room?.name}</h1>
            <h2 className={callout.secondaryTitle}>
                Room created by {room?.created_by || '<Enter your name next time>'}
            </h2>
            <h2 className={callout.secondaryTitle}>
                ID: <Label>{room?.id}</Label>
            </h2>
            <div className={callout.body}>
                You can invite people directly to this chat by sharing this link{' '}
                <Label>
                {link}
                <IconButton
                        title="Copy"
                        iconProps={{ iconName: 'Copy' }}
                        ariaLabel="Copy Invite Link"
                        onClick={() => navigator.clipboard.writeText(link)}
                />
                </Label>
            </div>
            {showFooter && (
                <div className={callout.footer}>
                    <span style={{ marginBottom: 10}}>
                        <strong>Bahir Dar Insititue of Technology Meeting Solution by{' '}</strong>
                    </span>
                    <span>Kaleb Damtew</span>
                    <span>Gedeon Eyasu</span>
                    <span>Eskinder Abera</span>
                    <span>Henoke Woldtsenaye</span>
                    
                        {/* <Link
                            href="https://github.com/"
                            target="_blank"
                            rel="nofollow noreferrer noopener"
                        > */}
                        {/* </Link> */}
                   
                    {/* <Link
                        href="https://github.com/muzam1l/mooz"
                        target="_blank"
                        rel="nofollow noreferrer noopener"
                    >
                        Fork me on GitHub
                    </Link> */}
                </div>
            )}
        </Callout>
    )
}

export default MyCallout
