import { jwtDecode, JwtPayload } from "jwt-decode";
import api from "./api"
import { Alert } from "react-native";
interface Response {
    token: string;
    user: {
        email: string;
    }
}

export async function signIn(email: string, password: string): Promise<{ token: string; user: { email: string } }> {
    console.log('Email:', email, 'Password:', password);
    return await api.post('/login', {
        email,
        password
    }).then((response) => {

        const token = response.data;
        console.log('Token:', token);
        const decoded = jwtDecode<JwtPayload>(token);
        //const useremail = decoded.sub;
        const user = {
            email: decoded.email
        }
        console.log('User:', user);
        return { token, user };
    }).catch((error) => {
        console.error('2Erro no login:', error.response.data.error);
        throw error.response.data.error;
    }
    );
}

export function signUp(name: string, email: string, password: string): Promise<Response> {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Name:', name, 'Email:', email, 'Password:', password);
            const response = await api.post('/users', {
                name,
                email,
                password
            });

            const token = response.data;
            const decoded = jwtDecode<JwtPayload>(token);

            const user = {
                email: decoded.email
            };

            resolve({ token, user });

        } catch (error: any) {
            // Verifique se o erro é relacionado ao e-mail já existente
            if (error.response && error.response.status === 409) {
                reject(new Error('Este e-mail já está cadastrado.'));
            } else {
                // Acessa a mensagem de erro personalizada enviada pelo backend
                const errorMessage = error.response?.data?.message || 'Erro desconhecido';
                console.log('Erro:', errorMessage);
                reject(new Error('Erro ao criar a conta. Email ou senha inválidos. ' + errorMessage));
                Alert.alert('Erro ao criar a conta:', errorMessage);
            }
        }
    });
}

export function firstTime(email: string): Promise<boolean> {
    return new Promise(async (resolve) => {
        const response = await api.get(`/candidate/${email}`);
        console.log('Response:', response);
        if (response.data) {
            resolve(false);
            console.log('Já tem candidato');
        } else {
            resolve(true);
            console.log('Não tem candidato');
        }
    });
}


