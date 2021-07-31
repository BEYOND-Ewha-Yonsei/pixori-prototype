import React, { useState } from 'react';
import "../styles/modal.css";
import { useCurrentUser } from "../hooks/current-user"
import { MintCluster } from '../clusters/mint-cluster'

const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const cu = useCurrentUser();
    const { open, close, header, arr } = props;
    const colorArray = arr.toString();
    const [nftName, setNftName] = useState("initial value")

    // 그림을 IPFS로부터 가져옴
    const getIPFS = () => {
        const ipfsApi = require('ipfs-api');
        const ipfs = ipfsApi('ipfs.infura.io', 5001, { protocol: "https" })
        console.log(ipfs);

        const cidIPFS = 'QmPJCxpLALHfkXzxvYX6vK6H6rFKjKWZMG1vtg3z4VZRzS';

        ipfs.files.get(cidIPFS, (err, result) => { // Download buffer from IPFS

            var imgFile = result[0].content.toString('utf8');
            console.log(imgFile);
        });
    };

    function set() {
        setNftName(document.getElementById("input").value)
        console.log(nftName)
    }

    if (cu.addr) {
        return (
            <div className={open ? 'openModal modal' : 'modal'}>
                {open ? (
                    <section>
                        <header>
                            {header}
                            <button className="close" onClick={close}> &times; </button>
                        </header>
                        <main>
                            <div>
                                <div className="input ">NFT Name</div>
                                <button onClick={getIPFS}> getPic </button>
                                <input className="input2" type="text" id="input" onChange={set}></input>
                                <MintCluster name={nftName} array={colorArray} address={cu.addr} />
                            </div>
                        </main>
                        <footer>
                        </footer>
                    </section>
                ) : null}
            </div>
        )
    } else {
        return (
            <div className={open ? 'openModal modal' : 'modal'}>
                {open ? (
                    <section>
                        <header>
                            {header}
                            <button className="close" onClick={close}> &times; </button>
                        </header>
                        <main>
                            <p>Login first!</p>
                            You can mint NFTs after logging in.
                        </main>
                        <footer>
                        </footer>
                    </section>
                ) : null}
            </div>
        )
    }
}
export default Modal
