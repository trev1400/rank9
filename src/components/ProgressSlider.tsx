import React from 'react'
import {Box, Slider, SliderThumb} from '@mui/material';
import styled from '@mui/styles/styled';

function ProgressSlider(props: any) {
    const BeelineSlider = styled(Slider)(({ theme }) => ({
        color: 'black',
        height: 3,
        padding: '13px 0',
        '& .MuiSlider-thumb': {
            marginLeft: 2,
            height: 22,
            width: 22,
            borderRadius: 0,
            backgroundColor: '#6CDCFF',
            '& .score': {
                fontSize: 12,
                marginBottom: 1
            }
        },
        '& .MuiSlider-track': {
            display: 'none'
        },
        '& .MuiSlider-mark': {
            color: 'white',
            height: 10,
            width: 10,
            '&[style="left: 100%;"]': {
                transform: 'rotate(45deg)',
                top: 9.5  
            }
        },
        '& .MuiSlider-markActive': {
            backgroundColor: '#6CDCFF',
            opacity: 1
        },
        '& .MuiSlider-rail': {
            opacity: 1,
            color: 'white',
            height: 2,
        },
    }));
    
    interface BeelineThumbComponentProps extends React.HTMLAttributes<unknown> {}
    
    function BeelineThumbComponent(thumbProps: BeelineThumbComponentProps) {
        const { children, ...other } = thumbProps;
        return (
            <SliderThumb {...other}>
                {children}
                <span className='score'>{props.score}</span>
            </SliderThumb>
        );
    }

    return (
        <Box style={{width: '100%', paddingRight: '12px', paddingLeft: '2px'}}>
            <BeelineSlider 
                components={{ Thumb: BeelineThumbComponent }}
                value={props.score}
                marks
                min={0}
                max={8}
                step={1}
            />
        </Box>
    )
} 

export default ProgressSlider

