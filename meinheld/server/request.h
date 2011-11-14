#ifndef REQUEST_H
#define REQUEST_H

#include "meinheld.h"
#include "buffer.h"

#define LIMIT_PATH 1024 * 8
#define LIMIT_FRAGMENT 1024
#define LIMIT_URI 1024 * 8
#define LIMIT_QUERY_STRING 1024 * 8

#define LIMIT_REQUEST_FIELDS 128
#define LIMIT_REQUEST_FIELD_SIZE 1024 * 8


typedef enum {
    BODY_TYPE_NONE,
    BODY_TYPE_TMPFILE,
    BODY_TYPE_BUFFER
} request_body_type;

typedef enum {
    FIELD,
    VALUE,
} field_type;

typedef struct {
    buffer *field;
    buffer *value;
} header;

typedef struct {
    buffer *path;
    buffer *uri;
    buffer *query_string;
    buffer *fragment;
    header *headers[LIMIT_REQUEST_FIELDS];
    uint32_t num_headers;
    field_type last_header_element;

    PyObject *env;
    void *next;
    int body_length;
    int body_readed;
    int bad_request_code;
    void *body;
    request_body_type body_type;
    PyObject *field;
    PyObject *value;

} request;

typedef struct {
    int size;
    request *head;
    request *tail;
} request_queue;


void push_request(request_queue *q, request *req);

request* shift_request(request_queue *q);

request_queue* new_request_queue(void);

void free_request_queue(request_queue *q);

request* new_request(void);

header* new_header(size_t fsize, size_t flimit, size_t vsize, size_t vlimit);

void free_header(header *h);

void free_request(request *req);

void dealloc_request(request *req);

void request_list_fill(void);

void request_list_clear(void);

void header_list_fill(void);

void header_list_clear(void);

#endif
