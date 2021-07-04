import { FunctionComponent, useState } from 'react'
import { Stack, Toggle, Label, useTheme } from '@fluentui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentCameraIdState, currentMicIdState, userStreamState } from '../atoms'

import Video from '../comps/video'
import { mr4, placeholder, preview } from './styles'
import { useUserMedia } from '../utils/hooks/use-streams'

const VideoPreview: FunctionComponent = () => {
    const [mediaBtnsDisabled, setMediaBtnsDisabled] = useState(false)
    
    const { startUserMedia, stopUserMedia } = useUserMedia()
    const currentMicId = useRecoilValue(currentMicIdState)
    const currentCameraId = useRecoilValue(currentCameraIdState)
    const theme = useTheme()
    const [userStream] = useRecoilState(userStreamState)
    return (
        <Stack grow className={preview}>
            <Stack.Item>
                <Stack style={{ marginTop: '.5em' }} horizontal horizontalAlign="space-between">
                    <Toggle
                        className={mr4}
                        onChange={async (_, checked) => {
                            setMediaBtnsDisabled(true)
                            if (checked)
                                await startUserMedia({ kind: 'audioinput' } as MediaDeviceInfo)
                            else await stopUserMedia('audioinput')
                            setMediaBtnsDisabled(false)
                        }}
                        // defaultChecked={!!currentMicId}
                        checked={!!currentMicId}
                        inlineLabel
                        label="Audio"
                        onText="On"
                        disabled={mediaBtnsDisabled}
                        offText="Off"
                    />
                    <Toggle
                        onChange={async (_, checked) => {
                            setMediaBtnsDisabled(true)
                            if (checked)
                                await startUserMedia({ kind: 'videoinput' } as MediaDeviceInfo)
                            else await stopUserMedia('videoinput')
                            setMediaBtnsDisabled(false)
                        }}
                        checked={!!currentCameraId}
                        // defaultChecked={!!currentCameraId}
                        inlineLabel
                        label="Video"
                        onText="On"
                        disabled={mediaBtnsDisabled}
                        offText="Off"
                    />
                </Stack>
            </Stack.Item>
            <Stack.Item>
                {userStream ? (
                    <Video
                        stream={userStream}
                        style={{
                            backgroundColor: theme.palette.neutralLight,
                            height: 'unset',
                        }}
                        label="Media preview"
                        noContextualMenu
                        muted
                    />
                ) : (
                    <Stack
                        verticalFill
                        verticalAlign="center"
                        horizontalAlign="center"
                        className={placeholder}
                        style={{
                            backgroundColor: theme.palette.neutralLight,
                        }}
                    >
                        <Label>Media Preview</Label>
                    </Stack>
                )}
            </Stack.Item>
        </Stack>
    )
}

export default VideoPreview
