import { webcrypto } from 'crypto'
export const isHashValid = async (data, botToken) => {
    const encoder = new TextEncoder();
    // const newTime = Math.floor(Date.now()/1000)
    // const auth_date = parseInt((data.auth_date))
    // if(newTime<auth_date){
    //     return false
    // }
    const checkString = Object.keys(data)
        .filter((key) => key !== 'hash')
        .map((key) => `${key}=${data[key]}`)
        .sort()
        .join('\n');
    const secretKey = await webcrypto.subtle.importKey(
        'raw',
        encoder.encode('WebAppData'),
        { name: 'HMAC', hash: 'SHA-256' },
        true,
        ['sign']
    );

    const secret = await webcrypto.subtle.sign('HMAC', secretKey, encoder.encode(botToken));

    const signatureKey = await webcrypto.subtle.importKey(
        'raw',
        secret,
        { name: 'HMAC', hash: 'SHA-256' },
        true,
        ['sign']
    );

    const signature = await webcrypto.subtle.sign('HMAC', signatureKey, encoder.encode(checkString));

    const hex = Buffer.from(signature).toString('hex');
    return data.hash === hex;
}