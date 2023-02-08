import { Fragment, useState,useEffect } from "react";
import axiosInstance from "../../redux/axiosInstance";
import Song from "../../components/Song";
import Playlist from "../../components/Playlist";
import { IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, InputGroup,FormControl,Row, Card, Button} from 'react-bootstrap'

const CLIENT_ID="10b45552d7634b85be61c721a2396f2d"
const CLIENT_SECRET="afc39ac1ee654d9c8bbdb413b6613bb9"

const Search = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState({});
	const [isFetching, setIsFetching] = useState(false);

	const [accessToken,setAccessToken]=useState("")
	const [albums,setAlbums]=useState([])
	useEffect(()=>{
		var authParameters={
			method:"POST",
			headers:{
				'Content-Type':"application/x-www-form-urlencoded"
			},
			body:'grant_type=client_credentials&client_id='+CLIENT_ID + '&client_secret='+CLIENT_SECRET
		}
		fetch("https://accounts.spotify.com/api/token",authParameters)
		.then(res=> {
			return res.json()
		})
		.then(data=> setAccessToken(data.access_token))
	},[])

	async function searchM(){
		console.log(search)
		var searchParameters={
			method:"GET",
			headers:{
				"Content-Type":"application/json",
				"Authorization":"Bearer "+accessToken
			}
		}
		var artistID=await fetch("https://api.spotify.com/v1/search?q="+ search + "&type=artist",searchParameters)
			.then(res=> {
				return res.json()
			})
			.then(data=> {return data.artists.items[0].id})
		console.log("artist id"+ artistID)

		var returnedAlbums= await fetch("https://api.spotify.com/v1/artists/"+artistID+"/albums"+"?include_groups=album&market=US&limit=50",searchParameters)
			.then(res=> res.json())
			.then(data=>{
				console.log(data)
				setAlbums(data.items)
			})

	}

	return (
		<div>
				<Container>
						<InputGroup style={{width:"70%"}}>
						<FormControl style={{padding:"2%"}}
							type="input"
							placeholder="Search for songs and playlists"
							onChange={(e)=>setSearch(e.target.value)}
							value={search}
						/>
						<Button style={{width:"10%"}} onClick={searchM}>search</Button>
					</InputGroup>
				</Container>
				<Container>
					<Row className="mx-2 row row-cols-4">
						{albums.map((album,i)=>{
							console.log(album.external_urls.spotify)
							return(
								<a target="_blank" href={album.external_urls.spotify}>
									<Card>
										<Card.Img src={album.images[0].url}/>
										<Card.Body>
											<Card.Title style={{color:"black"}}>
												{album.name}
											</Card.Title>
										</Card.Body>
									</Card>
								</a>
							)
						})}
						
					</Row>
				</Container>
		</div>
	);
};

export default Search;
