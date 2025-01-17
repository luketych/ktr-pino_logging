import assert from 'assert';


export default function constructHeader(trueCaller, tags, options) {
    assert(trueCaller, 'trueCaller is undefined');
    assert(options, 'options is undefined');


    let header = '';

    const dtStr = options.dtStrType === 'time' ? new Date().toISOString().slice(11, 19) : new Date().toISOString().slice(0, 24);
    
    header += `${dtStr}`;
    
    if (tags.length > 0) {
      header += ' tags:[';
      header += `${tags.join(',')}`;
      header += ']';
    }

    header += ` from:(${trueCaller}`;


    header += ')';


    return header;
}