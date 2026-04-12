import {SMTPServer, SMTPServerSession} from 'smtp-server';
import {Readable} from 'stream';
import * as emailDao from '../data-access/email.dao';

const onData = (stream: Readable, session: SMTPServerSession, callback: (err?: Error | null) => void) => {
    console.log(JSON.stringify(session));

    let from: string;
    if (session.envelope.mailFrom) {
        from = session.envelope.mailFrom.address;
    }
    const to: string = session.envelope.rcptTo.map(e => e.address).join(', ');
    let content = '';
    const collectContent = (chunk: Buffer | string) => {
        if (typeof chunk === 'string') {
            content += chunk;
        } else {
            content += chunk.toString('utf8');
        }
    };
    stream.on('data', collectContent);

    stream.on('end', () => {
        emailDao.saveEmail({from, to, content}).then(data => console.log(data));
        callback();
    });
};

const options = {authOptional: true, onData};
export const smtpServer = new SMTPServer(options);
