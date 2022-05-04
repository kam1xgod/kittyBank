package com.kami.study.finalProject.model.enums;

public enum TransferStatus {
    NEW {
        public TransferStatus next() {return DRAFT;}
    },
    DRAFT {
        public TransferStatus next() {return COMPLETE;}
    },
    COMPLETE {
        public TransferStatus next() {throw new UnsupportedOperationException();}
    },
    DENIED {
        public TransferStatus next() {return DRAFT;}
    };

    public abstract TransferStatus next();
}
