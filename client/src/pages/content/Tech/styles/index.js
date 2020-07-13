import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    height: 100vh;
    position: relative;
    margin: -1px;
`
export const Message = styled.div`
    z-index: 100000;
    padding: 40px;
    border-radius: 2px;
`
export const Image1 = styled.img`
    position: absolute;
    background-size: cover;
    width: 100%;
    height: 100vh;
`
