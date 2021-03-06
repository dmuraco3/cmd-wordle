import React, {FC, useState} from 'react';
import {Text, Box, useInput, useApp} from 'ink';
import axios from 'axios'
let preLine = [{character: " ", color: "white"},
				{character: " ", color: "white"},
				{character: " ", color: "white"},
				{character: " ", color: "white"},
				{character: " ", color: "white"}]
let preLines = [
	preLine,
	preLine,
	preLine,
	preLine,
	preLine,
	preLine,
]
// @ts-ignore

const checkDict = async (word: string) => {
	try {
		await axios.get(`https://api.wordnik.com/v4/word.json/${word}/definitions\?limit\=200\&includeRelated\=false\&useCanonical\=false\&includeTags\=false\&api_key\=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`)
		return true
	} catch( error) {
		return false
	}
}

const App: FC<{name?: string}> = () => {
	const {exit} = useApp()
	useInput(async (input, key) => {
		if (!gameOver) {
				if (key.escape) {
					exit()
				} else if (key.return) {
					if (/^[A-Z]$/i.test(curLine.map(val => val.character).join("")) === false) {
						let t = curLine.map((val) => val.character)
					    if (word == t.join("")) {
						    setGameOver(true)
						    let temp = curLine.map(value => Object({character: value.character, color: "green"}))
						    setCurLine(temp);
						    setLines([
						 		...lines.slice(0, pos.y),
						 		temp,
						 		...lines.slice(pos.y+1, ),
						    ])
					    } else {
							// @ts-ignore
							let response = await checkDict(t.join(""))
							console.log(response)
							setLines([
								...lines.slice(0, pos.y),
								curLine,
								...lines.slice(pos.y+1, ),
							])
					   }
   
						setCurLine(preLine)
						setPos({x: 0, y: pos.y+1})
					}
				} else if (key.delete && key.meta === false) {
					if (pos.x > 0) {
						setCurLine([
							...curLine.slice(0, pos.x-1),
							...preLine.slice(0,5-pos.x+1)
						])
						setPos({...pos, x: pos.x-1})
					}
				} else if (pos.x < 5) {
					if ( /^[A-Z]$/i.test(input)){
						setCurLine([
							...curLine.slice(0, pos.x),
							{character: input, color: "white"},
							...curLine.slice(pos.x+1),
			
						])
						setPos({...pos, x: pos.x + 1})
					}
				}
		}
	})
	// @ts-ignore
	const [charmap, setCharmap] = useState<{character: string, color: string}[][]>([
		[..."qwertyuiop"].map(val => Object({character: val, color: "white"})),
		[..."asdfghjkl"].map(val => Object({character: val, color: "white"})),
		[..."zxcvbnm"].map(val => Object({character: val, color: "white"}))
	])

	const word = "crane"
	
	const [gameOver, setGameOver] = useState(false)
	const [pos, setPos] = useState({x: 0, y:0})
	const [lines, setLines] = useState(preLines)
	const [curLine, setCurLine] = useState(
		[{character: " ", color: "white"},
		{character: " ", color: "white"},
		{character: " ", color: "white"},
		{character: " ", color: "white"},
		{character: " ", color: "white"}])
	return  (
		<Box width="100%">
			<Box flexDirection='column' height={3*6} >
				{lines.map((line, y) => (
					<Box flexDirection='row' height={3} key={y} width={5*5}>
						{y ===  pos.y ? 
							curLine.map((box, x) => (
								<Box key={x} flexDirection="column">
									<Text color={box.color}>
									???????????????
									</Text>
									<Text color={box.color}>
									??? {pos.x == x && pos.y == y ? "_" : box.character} ???
									</Text>
									<Text color={box.color}>
									???????????????
									</Text>
								</Box>

							))
						:
							line.map((box, x) => (
								<Box key={x} flexDirection="column">
									<Text color={box.color}>
									???????????????
									</Text>
									<Text color={box.color}>
									??? {pos.x == x && pos.y == y ? "_" : box.character} ???
									</Text>
									<Text color={box.color}>
									???????????????
									</Text>
								</Box>
							))
						}
					</Box>

				))}
				

			</Box>
			<Box flexDirection='column' height={3*6} marginLeft={2}>
				{charmap.map((line, y) => (
					<Box flexDirection='row' height={3} key={y} width={5*10} justifyContent="center">
						{
							line.map((box, x) => (
								<Box key={x} flexDirection="column">
									<Text color={box.color}>
									???????????????
									</Text>
									<Text>
									??? {box.character} ???
									</Text>
									<Text>
									???????????????
									</Text>
								</Box>
							))
						}
					</Box>

				))}
				

			</Box>
			<Box  height={6*3} flexDirection="column">
				{charmap.map((line, y) => (
					<Box key={y} flexDirection="row" height={3} width={5*10}>
						{line.map((box, x) => {
							<Box key={x} flexDirection="column">
								<Text>
								???????????????
								</Text>
								<Text>
								??? {box.character} ???
								</Text>
								<Text>
								???????????????
								</Text>
							</Box>
						})}
					</Box>
				))}
				{[0,1,2].map(( y) => (
					<Box key={y} flexDirection="row" height={3} width={5*10}>
						{[0,1,2,3,4,5,6,7,8,9].map((box, x) => {
							<Box key={x} flexDirection="column">
								<Text>
								???????????????
								</Text>
								<Text>
								??? {box} ???
								</Text>
								<Text>
								???????????????
								</Text>
							</Box>
						})}
					</Box>
				))}
			</Box>
		</Box>
	)
	
};
/*

???????????????????????????????????????????????????????????????????????????
??? _ ??????   ??????   ??????   ??????   ???
???????????????????????????????????????????????????????????????????????????
*/
module.exports = App;
export default App;
