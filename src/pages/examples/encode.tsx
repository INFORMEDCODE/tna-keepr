import { useEffect } from "react";
import { useRef, useState } from "react";

// CONSTANTS
const ENCRYPTION_ALGORITHM = "aes-gcm";
const ITERATIONS = 10;
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const DIGEST_ALGORITHM = "sha-256";

const EncodePage = () => {
    const [decodedText, setDecodedText] = useState("");
    const [masterKey, setMasterKey] = useState("");
    const [textToEncrypt, setTextToEncrypt] = useState("");
    const [cipherText, setCipherText] = useState("");

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    //decrypt function
    const decrypt = async (
        encoder: TextEncoder,
        decoder: TextDecoder,
        masterKey: string,
        data: string
    ) => {
        let decryptedContent;
        const decodedBase64Buffer = Uint8Array.from(data.toString(), (c) =>
            c.charCodeAt(0)
        );
        const saltToken = decodedBase64Buffer.slice(0, SALT_LENGTH);
        const initVector = decodedBase64Buffer.slice(
            SALT_LENGTH,
            SALT_LENGTH + IV_LENGTH
        );
        const encryptedDataBuffer = decodedBase64Buffer.slice(
            SALT_LENGTH + IV_LENGTH
        );

        const passwordKey = await getPasswordKey(encoder, masterKey);
        const aesKey = await deriveKeyWrapper(passwordKey, saltToken, [
            "decrypt",
        ]);

        try {
            decryptedContent = await window.crypto.subtle.decrypt(
                {
                    name: ENCRYPTION_ALGORITHM,
                    iv: initVector,
                },
                aesKey,
                encryptedDataBuffer
            );
        } catch (ex) {
            console.log(ex);
            throw new Error("Decryption failed");
        }

        console.log(decoder.decode(decryptedContent));
        setDecodedText(decoder.decode(decryptedContent));
    };
    //encrypt function
    const encrypt = async (
        encoder: TextEncoder,
        masterKey: string,
        data: string
    ) => {
        const saltToken = window.crypto.getRandomValues(
            new Uint8Array(SALT_LENGTH)
        );
        const initVector = window.crypto.getRandomValues(
            new Uint8Array(IV_LENGTH)
        );
        const passwordKey = await getPasswordKey(encoder, masterKey);

        const aesKey = await deriveKeyWrapper(passwordKey, saltToken, [
            "encrypt",
        ]);
        const encryptedContent = await window.crypto.subtle.encrypt(
            {
                name: ENCRYPTION_ALGORITHM,
                iv: initVector,
            },
            aesKey,
            encoder.encode(data)
        );

        // convert to buffer
        const encryptedContentArray: Uint8Array = new Uint8Array(
            encryptedContent
        );
        const buffer: Uint8Array = new Uint8Array(
            saltToken.byteLength +
                initVector.byteLength +
                encryptedContentArray.byteLength
        );

        buffer.set(saltToken, 0);
        buffer.set(initVector, saltToken.byteLength);
        buffer.set(
            encryptedContentArray,
            saltToken.byteLength + initVector.byteLength
        );

        const base64Buffer = Buffer.from(
            String.fromCharCode.apply(undefined, [...buffer])
        );

        console.log(base64Buffer.toString());
        setCipherText(base64Buffer.toString());
    };
    //deriveKeyWrapper function
    const deriveKeyWrapper = async (
        passwordKey: CryptoKey,
        salt: Uint8Array,
        keyUsage: ["encrypt"] | ["decrypt"]
    ) => {
        return await window.crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt,
                iterations: ITERATIONS,
                hash: DIGEST_ALGORITHM,
            },
            passwordKey,
            {
                name: ENCRYPTION_ALGORITHM,
                length: 256,
            },
            false,
            keyUsage
        );
    };
    //getPasswordKey function
    const getPasswordKey = async (encoder: TextEncoder, masterKey: string) => {
        return await window.crypto.subtle.importKey(
            "raw",
            encoder.encode(masterKey),
            "PBKDF2",
            false,
            ["deriveKey"]
        );
    };

    return (
        <div className="p-2">
            <h1 className="text-2xl">Encoder/Decoder Test</h1>
            <div>
                <label htmlFor="masterKey" className="text-lg">
                    Master Key:{" "}
                </label>
                <input
                    type="text"
                    id="masterKey"
                    value={masterKey}
                    className="rounded border border-2 border-solid p-2"
                    onChange={(e) => setMasterKey(e.currentTarget.value)}
                />
            </div>
            <div className="mb-10">
                <label htmlFor="textToEncrypt" className="text-lg">
                    Text to Encrypt:{" "}
                </label>

                <input
                    type="text"
                    id="textToEncrypt"
                    value={textToEncrypt}
                    className="w-full rounded border border-2 border-solid p-2"
                    onChange={(e) => setTextToEncrypt(e.currentTarget.value)}
                />
            </div>
            <div className="flex w-44 flex-col gap-2">
                <button
                    onClick={() => encrypt(encoder, masterKey, textToEncrypt)}
                    className="rounded border border-solid border-black p-2"
                >
                    Encode
                </button>
                <button
                    className="rounded border border-solid border-black p-2"
                    onClick={() =>
                        decrypt(encoder, decoder, masterKey, cipherText)
                    }
                >
                    Decode
                </button>
            </div>
            <p>{decodedText}</p>
        </div>
    );
};

export default EncodePage;
