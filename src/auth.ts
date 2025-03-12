import * as jose from "jose"

export type AuthToken = {
  token: string
  expireAt: number
}

export async function generateAuthToken({ 
  privateKeyId,
  issuerId, 
  privateKey, 
}:  {
  privateKeyId: string
  issuerId: string
  privateKey: string
}) : Promise<AuthToken> {

  const alg = 'ES256'
  const key = await jose.importPKCS8(privateKey, alg)
  const token =  await new jose.SignJWT({})
    .setProtectedHeader({
      alg,
      kid: privateKeyId,
      typ: 'JWT',
    })
    .setIssuer(issuerId)
    .setAudience('appstoreconnect-v1')
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(key)

  return {
    token,
    expireAt: Date.now() + (10 * 60 * 1000)
  }
}
