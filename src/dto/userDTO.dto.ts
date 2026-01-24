import { User } from "@/app/generated/prisma/client"

class UserDTO {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date

  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}

export default UserDTO