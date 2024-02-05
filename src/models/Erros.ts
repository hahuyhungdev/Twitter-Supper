import { USERS_MESSAGES } from '@/configs/messages'
import { HttpStatusCode } from 'axios'

type ErrorsType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>
// explain examle of type of record
// record<string,string > same as { [key:string]:string}
export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorsType
  constructor({ message = USERS_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HttpStatusCode.UnprocessableEntity })
    this.errors = errors
  }
}
