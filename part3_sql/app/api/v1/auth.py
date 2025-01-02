from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import create_access_token
from app.services import facade

from flask_jwt_extended import jwt_required, get_jwt_identity

api = Namespace('auth', description='Authentication operations')

# Model for input validation
login_model = api.model('Login', {
    'email': fields.String(required=True, description='User email'),
    'password': fields.String(required=True, description='User password')
})

@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        """Authenticate user and return a JWT token"""
        credentials = api.payload  # Get the email and password from the request payload

        # Step 1: Retrieve the user based on the provided email
        user = facade.get_user_by_email(credentials['email'])
        print(user.email)

        # Step 2: Check if the user exists and the password is correct
        if not user or not user.verify_password(credentials['password']):
            return {'error': 'Invalid credentials'}, 401

        # Step 3: Create a JWT token with the user's id and is_admin flag
        access_token = create_access_token(identity={'id': str(user.id), 'is_admin': user.is_admin})

        # Step 4: Return the JWT token to the client
        return {'access_token': access_token}, 200

@api.route('/protected')
class ProtectedResource(Resource):
    @jwt_required()
    def get(self):
        """A protected endpoint that requires a valid JWT token"""
        current_user = get_jwt_identity()  # Retrieve the user's identity from the token
        if current_user['is_admin'] == False:
            return {'message': f'Hello, user {current_user["id"]}'}, 200
        if current_user['is_admin'] == True:
            return {'message': f'Hello, Admin user {current_user["id"]}'}, 200

def verify_password(password):
    from app import bcrypt
    """ check password """
    return bcrypt.check_password_hash('password', password)