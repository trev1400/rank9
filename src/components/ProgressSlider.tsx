import React from 'react'
import {Box, Slider, SliderThumb} from '@mui/material';
import styled from '@mui/styles/styled';

interface ProgressSliderProps {
    rank: number,
    score: number
}

function ProgressSlider(props: ProgressSliderProps) {
    const BeelineSlider = styled(Slider)(({ theme }) => ({
        color: 'black',
        height: 3,
        padding: '13px 0',
        '& .MuiSlider-thumb': {
            marginLeft: 2,
            height: 24,
            width: 24,
            borderRadius: 0,
            backgroundColor: '#6CDCFF',
            '& .score': {
                fontSize: 11,
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
                value={props.rank}
                marks
                min={1}
                max={9}
                step={1}
            />
        </Box>
    )
} 

export default ProgressSlider

