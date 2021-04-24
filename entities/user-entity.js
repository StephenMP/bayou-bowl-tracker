export class UserEntity {
  id
  given_name
  family_name
  nickname
  name
  picture
  locale
  updated_at
  email
  email_verified
  sub
  steam_name
  twitch_name
  discord_name
  twitter_name
  about_me

  static fromAuth0(auth0User) {
    var userEntity = new UserEntity()
    Object.assign(userEntity, auth0User)
    userEntity.id = userEntity.sub.split('|')[1]
    return userEntity
  }
}